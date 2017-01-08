import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Project } from './project';
import { PROJECTS } from './mock-projects';
import { CommandsService } from '../commands/commands.service';
import { ProjectCommand } from './project/project.commands';
import * as _ from 'lodash';

@Injectable()

export class ProjectsService {

  projects = new Array<Project>();
  commands = new Array<ProjectCommand>();

  constructor() {
    this.projects = PROJECTS;
  }

  createProject(doSave: boolean): Project {
    let newItem = new Project;
    newItem.Guid = UUID.UUID();
    if (doSave) {
      this.projects.splice(0, 0, newItem);
    }
    return newItem;
  }

  cloneProject(original: Project): Project {
    let clonedItem = this.createProject(false);
    clonedItem.EndDate = original.EndDate;
    clonedItem.Name = original.Name;
    clonedItem.StartDate = original.StartDate;
    return clonedItem;
  }

  getProjects(searchText: string): Promise<Project[]> {
    if (searchText && searchText.length > 0) {
      let results = _.filter<Project>(PROJECTS, prj => prj.Name.indexOf(searchText) > -1);
      return Promise.resolve(results);
    }
    return Promise.resolve(PROJECTS);
  }

  getProject(guid: string): Promise<Project> {
    return Promise.resolve(this.projects.find(f => f.Guid === guid));
  }

  postCommand(command: ProjectCommand, replaceOriginal: Boolean) {
    // todo: (optional) remove (some) duplicate commands, e.g. reschedule only needs the last one.
    this.commands.push(command);
  }
}
