import { NgModule, Component, OnInit } from '@angular/core';
import { UsersService } from './admin/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Epics } from './menu-state';
import { UiMenuComponent } from './ui-menu/ui-menu.component';
import { NotificationComponent } from 'angular2-notifications';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { NavLink } from './shared/appnavbar/navlink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService, Epics]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Software Management';
  username = '';
  // projectsColor = '';
  // productsColor = '';
  // designsColor = '';
  // contactsColor = '';
  // companiesColor = '';
  // technologiesColor = '';
  // loginColor = '';
  public navLinks = new Array<NavLink>(
    new NavLink('/projects', 'Projects', false),
    new NavLink('/products', 'Products', true),
    new NavLink('/designs', 'Designs', false),
    new NavLink('/contacts', 'Contacts', false),
    new NavLink('/companies', 'Companies', false),
    new NavLink('/technologies', 'Technologies', false),
    new NavLink('/login', 'Login', false)
  );
//  menuitems = new Array<string>('projects', 'products', 'designs', 'contacts', 'companies', 'technologies', 'login');
  private usernameSubscription: Subscription;

  constructor(private usersservice: UsersService, private router: Router, private activatedroute: ActivatedRoute,
    private epics: Epics) {
    // this.resetColors();
    // this.updateActive(this.activatedroute.url.toString());
    //    this.router.events.subscribe((val) => this.updateActive(val.toString())); // todo: used to be url?
  }
  ngOnInit() {
    this.usernameSubscription = this.usersservice.username$.subscribe(item => this.username = item);
  }
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.usernameSubscription.unsubscribe();
  }

  // updateActive(url: string) {
  //   if (url.length > 1) {
  //     let epic = '';
  //     if (url.indexOf('/', 1) > 1) {
  //       epic = url.substr(1, url.indexOf('/', 1) - 1);
  //     } else {
  //       epic = url.substr(1);
  //     }
  //     if (epic === this.epics.projects) {
  //       this.showProjects(false);
  //     } else if (epic === this.epics.products) {
  //       this.showProducts(false);
  //     } else if (epic === this.epics.designs) {
  //       this.showDesigns(false);
  //     } else if (epic === this.epics.companies) {
  //       this.showCompanies(false);
  //     } else if (epic === this.epics.contacts) {
  //       this.showContacts(false);
  //     } else if (epic === this.epics.technologies) {
  //       this.showTechnologies(false);
  //     } else if (epic === this.epics.login) {
  //       this.showLogin(false);
  //     }
  //   }
  // }

  isLoggedIn(): boolean {
    return this.usersservice.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.usersservice.isAdmin();
  }

  logout() {
    this.usersservice.logout();
  }

  // resetColors() {
  //   this.projectsColor = 'primary';
  //   this.productsColor = 'primary';
  //   this.designsColor = 'primary';
  //   this.companiesColor = 'primary';
  //   this.contactsColor = 'primary';
  //   this.technologiesColor = 'primary';
  //   this.loginColor = 'primary';
  // }

  // showProjects(doNavigate?: boolean) {
  //   this.resetColors();
  //   this.projectsColor = 'accent';
  //   if (doNavigate) {
  //     this.router.navigate(['/' + this.epics.projects]);
  //   }
  // }

  // showProducts(doNavigate?: boolean) {
  //   this.resetColors();
  //   this.productsColor = 'accent';
  //   if (doNavigate) {
  //     this.router.navigate(['/' + this.epics.products]);
  //   }
  // }

  // showDesigns(doNavigate?: boolean) {
  //   this.resetColors();
  //   this.designsColor = 'accent';
  //   if (doNavigate) {
  //     this.router.navigate(['/' + this.epics.designs]);
  //   }
  // }

  // showCompanies(doNavigate?: boolean) {
  //   this.resetColors();
  //   this.companiesColor = 'accent';
  //   if (doNavigate) {
  //     this.router.navigate(['/' + this.epics.companies]);
  //   }
  // }

  // showContacts(doNavigate?: boolean) {
  //   this.resetColors();
  //   this.contactsColor = 'accent';
  //   if (doNavigate) {
  //     this.router.navigate(['/' + this.epics.contacts]);
  //   }
  // }

  // showTechnologies(doNavigate?: boolean) {
  //   this.resetColors();
  //   this.technologiesColor = 'accent';
  //   if (doNavigate) {
  //     this.router.navigate(['/' + this.epics.technologies]);
  //   }
  // }

  // showLogin(doNavigate?: boolean) {
  //   this.resetColors();
  //   this.loginColor = 'accent';
  //   if (doNavigate) {
  //     this.router.navigate(['/' + this.epics.login]);
  //   }
  // }
}
