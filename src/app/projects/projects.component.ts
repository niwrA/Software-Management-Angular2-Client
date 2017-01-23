import { Component, Input, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project';
import { UUID } from 'angular2-uuid';

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

  constructor(private projectsService: ProjectsService, private zone: NgZone, private changeDetectorRef: ChangeDetectorRef) { }

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

  updateProjects(projects: Array<Project>): void {
    this.projects = projects;
  }

  createProject(name: string): void {
    let project = this.projectsService.createProject(true, name);
    // this.searchText = '';
    this.getProjects();
  }

  deleteProject(project: Project): void {
    this.projectsService.deleteProject(project);
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
  }

}
