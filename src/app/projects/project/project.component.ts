
import {switchMap} from 'rxjs/operators';

import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../project';
import { ProjectRole } from './projectroles/projectrole';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectsService) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.service.getProject(params['projectId'])))
      .subscribe((project: Project) => this.project = project);
  }
}
