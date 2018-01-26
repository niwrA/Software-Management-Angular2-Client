import { Component, OnInit, Input } from '@angular/core';
import { NavLink } from './navlink';

@Component({
  selector: 'app-navbar',
  templateUrl: './appnavbar.component.html',
  styleUrls: ['./appnavbar.component.css']
})
export class AppnavbarComponent implements OnInit {
  @Input() public navLinks: Array<NavLink> = new Array<NavLink>();
  @Input() public colorName: string;

  constructor() {
   }

  ngOnInit() {
  }

}
