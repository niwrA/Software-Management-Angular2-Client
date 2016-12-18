import { Component, Input } from '@angular/core';
import { UIROUTER_DIRECTIVES } from 'ui-router-ng2';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  @Input() project;
}
