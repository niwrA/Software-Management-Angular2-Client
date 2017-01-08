import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../project';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;
  previousProject: Project;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectsService
  ) { }

  update(newValue) {
    this.previousProject = this.project;
    this.project = newValue;
  }

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getProject(params['projectId']))
      .subscribe((project: Project) => this.update(project));
  }

  changeName(): void {
    if (this.previousProject !== undefined) {
      if (this.project.Name !== this.previousProject.Name) {
        // rename project command
        this.previousProject = this.project;
      }
    } else {
      this.previousProject = this.project;
    }
  }

  changeStartDate(): void {
    if (event) {
      let something = event;
    }
  }

  changeEndDate(event): void {
    if (event) {
      let something = event;
    }
  }

}
