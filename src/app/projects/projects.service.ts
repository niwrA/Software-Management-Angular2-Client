import { Injectable, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { Project, ProjectState } from './project';
import { PROJECTS } from './mock-projects';
import { CommandsService } from '../commands/commands.service';
import { NotificationsService } from 'angular2-notifications';
import { ProjectCommand, CreateProjectCommand, DeleteProjectCommand } from './project/project.commands';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectsService {
  projectsUrl = environment.projectsUrl;
  projects = new Array<Project>();

  constructor(private commandsService: CommandsService, private http: Http,
    private notificationService: NotificationsService) {
    this.getProjects('').then(result => this.projects = result as Array<Project>);
  }

  createProject(doSave: boolean, name?: string): Project {
    const newItem = new Project();
    newItem.guid = UUID.UUID();
    newItem.name = name;
    if (doSave) {
      this.projects.splice(0, 0, newItem);
      const createProjectCommand = new CreateProjectCommand(newItem);
      this.commandsService.postCommand(createProjectCommand, false);
    }
    return newItem;
  }

  deleteProject(project: Project): void {
    const index = this.projects.indexOf(project, 0);
    if (index > -1) {
      this.projects.splice(index, 1);
    }
    this.postCommand(new DeleteProjectCommand(project), false);
  }

  cloneProject(original: Project): Project {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }

  getProjects(searchText: string): Promise<Array<Project>> {
    if (this.projects.length > 0) {
      if (searchText && searchText.length > 0) {
        const results = _.filter<Project>(this.projects, prj => prj.name.indexOf(searchText) > -1);
        return Promise.resolve(results);
      } else { return Promise.resolve(this.projects); }
    } else {
      return this.http.get(this.projectsUrl)
        .toPromise()
        .then(response => this.parseResponse(response, this.projects))
        .catch(this.handleError);
    }
  }

  parseResponse(response: any, projects: Array<Project>): Array<Project> {
    const states = response.json() as Array<ProjectState>;
    projects = new Array<Project>();
    for (const state of states) {
      projects.push(new Project(state));
    }
    return projects;
  }

  getProject(guid: string): Promise<Project> {
    if (this.projects.length > 0) {
      const result = _.find(this.projects, prj => prj.guid === guid);
      return Promise.resolve(result);
    } else {
      return this.http.get(this.projectsUrl + '/' + guid)
        .toPromise()
        .then(response => new Project(response.json() as ProjectState))
        .catch(this.handleError);
    }
  }

  postCommand(command: ProjectCommand, replaceOriginal: boolean) {
    this.commandsService.postCommand(command, replaceOriginal);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    this.notificationService.error('An error occurred', error, { timeOut: 5000, clickToClose: false });
    return Promise.reject(error.message || error);
  }

}
