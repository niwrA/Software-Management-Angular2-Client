import { Component, OnInit } from '@angular/core';
import { PROJECTROLES } from './mock-projectroles';
import { Project } from '../../project';
import { ProjectRole } from './projectrole';
import { ProjectsService } from '../../projects.service';
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
  private project: Project;
  projectroles: Array<ProjectRole>;
  canAdd: boolean;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectsService
  ) { }

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getProject(params['projectId']))
      .subscribe(project => this.updateProject(project));
  }

  updateProject(project: Project) {
    this.project = project;
    this.projectroles = project.projectRoles
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
  }

  createProjectRole(name: string) {
    let projectrole = new ProjectRole();
    projectrole.guid = UUID.UUID();
    projectrole.name = name;

    this.project.projectRoles.push(projectrole);
    this.updateProject(this.project);

    var command = new AddRoleToProjectCommand(this.project, projectrole.guid, projectrole.name);
    this.service.postCommand(command, false);
  }

  deleteProjectRole(projectrole: ProjectRole) {
    this.projectroles.splice(this.projectroles.indexOf(projectrole));
    var command = new RemoveRoleFromProjectCommand(this.project, projectrole.guid);
    this.service.postCommand(command, false);
  }

  getProjectRoles(searchText: string) {
    if (searchText && searchText.length > 0) {

      let results = _.filter<ProjectRole>(this.projectroles, prj => prj.name.indexOf(searchText) > -1);
      return Promise.resolve(results);
    }
    return Promise.resolve(this.projectroles);
  }
}
