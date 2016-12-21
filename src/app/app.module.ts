import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as _ from 'lodash';

import { AppComponent } from './app.component';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsService } from './projects/projects.service';

import { CustomersComponent } from './customers/customers.component';

import { StateRegistry, Transition, UIRouterModule } from 'ui-router-ng2';
import { ContactsComponent } from './contacts/contacts.component';

import { CompaniesComponent } from './companies/companies.component';
import { CompaniesService } from './companies/companies.service';
import { CompanyComponent } from './company/company.component';

import { TechnologiesComponent } from './technologies/technologies.component';
import { TechnologyComponent } from './technology/technology.component';
import { TechnologiesService } from './technologies/technologies.service';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ProductsService } from './products/products.service';
import { ProductVersionsComponent } from './productversions/productversions.component';
import { ProductVersionsService } from './productversions/productversions.service';
import { ProductVersionComponent } from './productversion/productversion.component';
import {
  projectsState, projectState, productsState, productState, contactsState, companiesState, companyState,
  technologiesState, technologyState, productVersionsState, productVersionState
} from './ui-router-states';

import * as vis from 'ui-router-visualizer';
import { ProductfeaturesComponent } from './productfeatures/productfeatures.component';
import { ProductfeatureComponent } from './productfeature/productfeature.component';
import { ProductissuesComponent } from './productissues/productissues.component';
import { ProductissueComponent } from './productissue/productissue.component';
import { ProductconfigsComponent } from './productconfigs/productconfigs.component';
import { ProductconfigComponent } from './productconfig/productconfig.component';


export let routerConfig = {
  constructor(router: UIRouterModule) {
    vis.visualizer(router);
  },
  otherwise: '/',
  states: [projectsState, projectState, productsState, productState, contactsState, companiesState, companyState,
    technologiesState, technologyState, productVersionsState, productVersionState]
};
// other imports 
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    UIRouterModule.forRoot(routerConfig)  // comment out this line before ng serve, then remove it again when ng serve is running
  ],
  declarations: [
    AppComponent,
    ProductsComponent,
    ProjectsComponent,
    ProjectComponent,
    TechnologiesComponent,
    CustomersComponent,
    ContactsComponent,
    CompaniesComponent,
    CompanyComponent,
    TechnologyComponent,
    ProductComponent,
    ProductVersionsComponent,
    ProductVersionComponent,
    ProductfeaturesComponent,
    ProductfeatureComponent,
    ProductissuesComponent,
    ProductissueComponent,
    ProductconfigsComponent,
    ProductconfigComponent
  ],
  providers: [ProjectsService, CompaniesService, TechnologiesService, ProductsService, ProductVersionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
