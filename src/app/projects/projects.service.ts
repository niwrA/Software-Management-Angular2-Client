import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Project } from './project';
import { PROJECTS } from './mock-projects';
import { CommandsService } from '../commands/commands.service';
import * as _ from 'lodash';

@Injectable()

export class ProjectsService {

  projects = new Array<Project>();

  constructor() {
    this.projects = PROJECTS;
  }

  createProject(): Project {
    let newItem = new Project;
    newItem.Guid = UUID.UUID();
    this.projects.splice(0, 0, newItem);
    return newItem;
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
}
