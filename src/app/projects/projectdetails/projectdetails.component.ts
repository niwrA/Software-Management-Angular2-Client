import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../project';
import { RenameProjectCommand, ChangeStartDateForProjectCommand, ChangeEndDateForProjectCommand } from '../project/project.commands';
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
    this.previousProject = this.service.cloneProject(newValue);
    this.project = newValue;
  }

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getProject(params['projectId']))
      .subscribe((project: Project) => this.update(project));
  }

  changeName(): void {
    if (this.previousProject !== undefined) {
      if (this.project.Name !== this.previousProject.Name) {
        let renameCommand = new RenameProjectCommand(this.project, this.previousProject.Name);
        this.service.postCommand(renameCommand, false);
        this.previousProject.Name = this.project.Name;
      }
    } else {
      this.previousProject = this.project;
    }
  }

  changeStartDate(): void {
    if (this.project.StartDate !== this.previousProject.StartDate) {
      let changeStartDateForCommand = new ChangeStartDateForProjectCommand(this.project, this.previousProject.StartDate);
      this.service.postCommand(changeStartDateForCommand, false);
      this.previousProject.StartDate = this.project.StartDate;
    }
  }

  changeEndDate(): void {
    if (this.project.EndDate !== this.previousProject.EndDate) {
      let command = new ChangeEndDateForProjectCommand(this.project, this.previousProject.EndDate);
      this.service.postCommand(command, false);
      this.previousProject.EndDate = this.project.EndDate;
    }
  }
}
