import { Component, Input, OnInit, NgZone } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectsService]
})

export class ProjectsComponent implements OnInit {
  @Input() projects = new Array<Project>();
  selectedProject: Project;
  searchText: string;

  constructor(private projectsService: ProjectsService, private zone: NgZone) { }

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
    this.projectsService.getProjects(this.searchText).then(projects => this.zone.run(() => this.projects = projects));
  }

  createProject(name: string): void {
    let project = this.projectsService.createProject(true, name);
    this.searchText = '';
    this.getProjects();
  }
}
