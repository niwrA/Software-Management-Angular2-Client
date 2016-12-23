import { Component, Input, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project';
import { UUID } from 'angular2-uuid';/*

import { UIROUTER_DIRECTIVES } from 'ui-router-ng2';
*/
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectsService]
})
export class ProjectsComponent implements OnInit {

  projects = new Array<Project>();
  selectedProject: Project;
  searchText: string;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.getProjects();
  }

  onSelect(project: Project): void {
    this.selectedProject = project;
  }

  clearSelection(): void {
    this.selectedProject = null;
  }

  projectDetail(event, project: Project): void {
/*    event.stopPropagation();
    this.router.navigate(['/project', project.Guid]);
*/  }

  getProjects(): void {
    this.projectsService.getProjects(this.searchText).then(projects => this.projects = projects);
  }

  createProject(name: string): void {
    let project = this.projectsService.createProject();
    project.Name = name;
    this.searchText = '';
    this.getProjects();
  }
}
