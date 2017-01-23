import { Injectable, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { Project } from './project';
import { PROJECTS } from './mock-projects';
import { CommandsService } from '../commands/commands.service';
import { ProjectCommand, CreateProjectCommand, DeleteProjectCommand } from './project/project.commands';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
@Injectable()

export class ProjectsService {
  projectsUrl = 'http://localhost:50274/api/projects';
  projects = new Array<Project>();

  constructor(private commandsService: CommandsService, private http: Http) {
    this.getProjects('').then(result => this.projects = result as Array<Project>);
  }

  createProject(doSave: boolean, name?: string): Project {
    let newItem = new Project;
    newItem.guid = UUID.UUID();
    newItem.name = name;
    if (doSave) {
      this.projects.splice(0, 0, newItem);
      let createProjectCommand = new CreateProjectCommand(newItem);
      this.commandsService.postCommand(createProjectCommand, false);
    }
    return newItem;
  }

  deleteProject(project: Project): void {
    //project.isDeleted = true;
    let index = this.projects.indexOf(project, 0);
    if (index > -1) {
      this.projects.splice(index, 1);
    }
    this.postCommand(new DeleteProjectCommand(project), false);
  }

  cloneProject(original: Project): Project {
    if (original) {
      let clonedItem = this.createProject(false);
      clonedItem.endDate = original.endDate;
      clonedItem.name = original.name;
      clonedItem.startDate = original.startDate;
      return clonedItem;
    }
  }

  getProjects(searchText: string): Promise<Array<Project>> {
    if (this.projects.length > 0) {
      if (searchText && searchText.length > 0) {
        let results = _.filter<Project>(this.projects, prj => prj.name.indexOf(searchText) > -1);
        return Promise.resolve(results);
      } else { return Promise.resolve(this.projects); }
    } else {
      return this.http.get(this.projectsUrl)
        .toPromise()
        .then(response => response.json() as Array<Project>)
        .catch(this.handleError);
    }
  }

  getProject(guid: string): Promise<Project> {
    if (this.projects.length > 0) {
      let result = _.find(this.projects, prj => prj.guid === guid);
      return Promise.resolve(result);
    } else {
      return this.http.get(this.projectsUrl + '/' + guid)
        .toPromise()
        .then(response => response.json() as Project)
        .catch(this.handleError);
    }
  }

  postCommand(command: ProjectCommand, replaceOriginal: boolean) {
    this.commandsService.postCommand(command, replaceOriginal);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
