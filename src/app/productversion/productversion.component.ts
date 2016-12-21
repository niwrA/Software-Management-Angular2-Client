import { Component, Input } from '@angular/core';
import { UIROUTER_DIRECTIVES } from 'ui-router-ng2';

@Component({
  selector: 'app-productversion',
  templateUrl: './productversion.component.html',
  styleUrls: ['./productversion.component.css']
})
export class ProductVersionComponent {

  @Input() productversion;

}
