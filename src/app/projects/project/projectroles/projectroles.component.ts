import { Component, OnInit, Input } from '@angular/core';
import { PROJECTROLES } from './mock-projectroles';
import { Project } from '../../project';
import { ProjectRole } from './projectrole';
import { ProjectsService } from '../../projects.service';
import { ProjectRoleAssignmentsService } from '../../../projectroleassignments/projectroleassignments.service';
import { Contact } from '../../../contacts/contact';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
import { AddRoleToProjectCommand, AddRoleToProjectParameters, RemoveRoleFromProjectCommand } from '../project.commands';

@Component({
  selector: 'app-projectroles',
  templateUrl: './projectroles.component.html',
  styleUrls: ['./projectroles.component.css']
})
export class ProjectRolesComponent implements OnInit {
  public project: Project;
  @Input() projectroles: Array<ProjectRole>;
  filteredProjectRoles: Array<ProjectRole>;
  canAdd: boolean;
  searchText: string;
  mailto: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectsService,
    private projectRoleAssignmentsService: ProjectRoleAssignmentsService
  ) { }

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getProject(params['projectId']))
      .subscribe(project => this.updateProject(project));
  }

  updateProject(project: Project) {
    this.project = project;
    this.projectroles = project.projectRoles; // todo: we get it like this or through input?
    this.updateProjectRoles(this.projectroles);
    this.getAllEmails();
  }

  updateProjectRoles(projectroles: Array<ProjectRole>) {
    this.filteredProjectRoles = new Array<ProjectRole>();
    projectroles.forEach(projectRole => this.filteredProjectRoles.push(projectRole));
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
    this.getProjectRoles(this.searchText).then(projectroles => this.updateProjectRoles(projectroles));
  }

  createProjectRole(name: string) {
    const projectrole = new ProjectRole();
    projectrole.guid = UUID.UUID();
    projectrole.name = name;

    this.project.projectRoles.push(projectrole);
    this.updateProject(this.project);
    this.filteredProjectRoles.push(projectrole);

    const command = new AddRoleToProjectCommand(this.project, projectrole.guid, projectrole.name);
    this.service.postCommand(command, false);
  }

  deleteProjectRole(projectrole: ProjectRole) {
    this.projectroles.splice(this.projectroles.indexOf(projectrole));
    this.filteredProjectRoles.splice(this.filteredProjectRoles.indexOf(projectrole));
    const command = new RemoveRoleFromProjectCommand(this.project, projectrole.guid);
    this.service.postCommand(command, false);
  }

  getProjectRoles(searchText: string) {
    if (searchText && searchText.length > 0) {

      const results = _.filter<ProjectRole>(this.projectroles, prj => prj.name.indexOf(searchText) > -1);
      return Promise.resolve(results);
    }
    return Promise.resolve(this.projectroles);
  }

  getAllEmails() {
    this.projectRoleAssignmentsService.getContactsByProjectGuid(this.project.guid)
      .then((contacts: Array<Contact>) => this.createMailTo(contacts));
  }

  createMailTo(contacts) {
    this.mailto = _.map(contacts, 'email').join(';');
  }
}
