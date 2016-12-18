import { UIRouterModule } from  'ui-router-ng2';
import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UIRouterModule ]
})
export class AppComponent {
  title = 'Software Management';

  constructor(private router: UIRouterModule ) { }
}
