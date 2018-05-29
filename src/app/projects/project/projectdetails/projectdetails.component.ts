
import {switchMap} from 'rxjs/operators';

import { Component, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../../project';
import { RenameProjectCommand, ChangeStartDateOfProjectCommand, ChangeEndDateOfProjectCommand } from '../project.commands';
import { ProjectsService } from '../../projects.service';

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

  ngOnInit() {
    // todo:  back to route.parent
    this.route.parent.params.pipe(switchMap((params: Params) => this.service.getProject(params['projectId'])))
      .subscribe((project: Project) => this.update(project));
  }

  update(newValue) {
    if (newValue) {
      this.previousProject = this.service.cloneProject(newValue);
      this.project = newValue;
    }
  }

  changeName(): void {
    if (this.previousProject !== undefined) {
      if (this.project.name !== this.previousProject.name) {
        const renameCommand = new RenameProjectCommand(this.project, this.previousProject.name);
        this.service.postCommand(renameCommand, false);
        this.previousProject.name = this.project.name;
      }
    } else {
      this.previousProject = this.project;
    }
  }

  changeStartDate(): void {
    if (this.project.startDate !== this.previousProject.startDate) {
      const changeStartDateForCommand = new ChangeStartDateOfProjectCommand(this.project, this.previousProject.startDate);
      this.service.postCommand(changeStartDateForCommand, false);
      this.previousProject.startDate = this.project.startDate;
    }
  }

  changeEndDate(): void {
    if (this.project.endDate !== this.previousProject.endDate) {
      const command = new ChangeEndDateOfProjectCommand(this.project, this.previousProject.endDate);
      this.service.postCommand(command, false);
      this.previousProject.endDate = this.project.endDate;
    }
  }
}
