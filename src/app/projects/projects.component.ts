import { Component, Input, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {
  @Input() projects = new Array<Object>();
  @Input() canAdd: Boolean;
  selectedProject: Project;
  searchText: string;

  constructor(private projectsService: ProjectsService) {
    this.projects = projectsService.projects;
   }

  ngOnInit() {
    this.getProjects();
  }

  onSelect(project: Project): void {
    this.selectedProject = project;
  }

  clearSelection(): void {
    this.selectedProject = null;
  }

  getProjects(): void {
    this.projectsService.getProjects(this.searchText).then(projects => this.projects = projects);
  }

  updateProjects(projects: Array<Project>): void {
    this.projects = projects;
  }

  createProject(name: string): void {
    const project = this.projectsService.createProject(true, name);
    this.getProjects();
  }

  deleteProject(project: Project): void {
    this.projectsService.deleteProject(project);
    this.projects = this.projectsService.projects;
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
  }

}
