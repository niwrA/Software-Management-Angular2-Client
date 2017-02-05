import { Project, ProjectState } from './project';
import { ProjectRoleState } from './project/projectroles/projectrole';
export const PROJECTS: ProjectState[] = [
  {
    guid: 'nodates', name: 'Project NoDates', startDate: '',
    endDate: '', projectRoles: new Array<ProjectRoleState>()
  },
  {
    guid: 'startdateonly', name: 'Project StartDate', startDate: '2017-01-01',
    endDate: '', projectRoles: new Array<ProjectRoleState>()
  },
  {
    guid: 'enddateonly', name: 'Project EndDate', startDate: '',
    endDate: '2017-11-06', projectRoles: new Array<ProjectRoleState>()
  },
  {
    guid: 'bothdates', name: 'Project BothDates', startDate: '2017-01-01',
    endDate: '2017-11-06', projectRoles: new Array<ProjectRoleState>()
  },
  {
    guid: 'with2roles', name: 'Project With Two Roles', startDate: '2017-01-01',
    endDate: '2017-11-06', projectRoles: [{ guid: 'tester', name: 'Tester' }, { guid: 'developer', name: 'Developer' }]
  }
];
import { CommandsService } from '../commands/commands.service';
import { Http } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import { ProjectCommand } from './project/project.commands';
export class ProjectsServiceStub {
  projects: Array<Project> = new Array<Project>();
  constructor() {
    PROJECTS.forEach(element => {
      this.projects.push(new Project(element));
    });
  }
  getProjects(searchText: string): Promise<Array<Project>> {
    return Promise.resolve(this.projects);
  };
  getProject(guid: string): Promise<Project> {
    return Promise.resolve(this.projects.find(f => f.guid === guid));
  };
  postCommand(command: ProjectCommand, replaceOriginal: boolean) {
  }

};
