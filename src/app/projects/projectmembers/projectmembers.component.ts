import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { Project } from '../project';
import { UUID } from 'angular2-uuid';
import { SemgraphService } from '../../semgraph/semgraph.service';
import { Semgraph } from '../../semgraph/semgraph';

@Component({
  selector: 'app-projectmembers',
  templateUrl: './projectmembers.component.html',
  styleUrls: ['./projectmembers.component.css']
})
export class ProjectMembersComponent implements OnInit {
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectsService
  ) { }

  // todo: use id to get semgraphs and then get members?
  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getProject(params['projectId']))
      .subscribe((project: Project) => this.project = project);
  }
}
