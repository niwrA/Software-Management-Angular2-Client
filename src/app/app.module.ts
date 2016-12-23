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

import { ContactsComponent } from './contacts/contacts.component';
import { ContactsService } from './contacts/contacts.service';
import { ContactComponent } from './contact/contact.component';

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
import { ProductFeaturesComponent } from './productfeatures/productfeatures.component';
import { ProductFeatureComponent } from './productfeature/productfeature.component';
import { ProductIssuesComponent } from './productissues/productissues.component';
import { ProductIssueComponent } from './productissue/productissue.component';
import { ProductConfigsComponent } from './productconfigs/productconfigs.component';
import { ProductConfigComponent } from './productconfig/productconfig.component';
import { SmaTextareaComponent } from './sma-textarea/sma-textarea.component';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { PageNotFoundComponent } from './not-found.component';
import { AppRoutingModule }        from './app-routing.module';
//import { MdContentModule, MdSubheaderModule } from "ng2-material";
// other imports 
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule],
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
    ProductFeaturesComponent,
    ProductFeatureComponent,
    ProductIssuesComponent,
    ProductIssueComponent,
    ProductConfigsComponent,
    ProductConfigComponent,
    ContactComponent,
    SmaTextareaComponent,
    PageNotFoundComponent
  ],
  providers: [ProjectsService, CompaniesService, TechnologiesService, ProductsService, ProductVersionsService, ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
  
platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
