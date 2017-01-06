import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as _ from 'lodash';

import { AppComponent } from './app.component';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectsService } from './projects/projects.service';

import { ContactsComponent } from './contacts/contacts.component';
import { ContactsService } from './contacts/contacts.service';
import { ContactComponent } from './contacts/contact/contact.component';

import { CompaniesComponent } from './companies/companies.component';
import { CompaniesService } from './companies/companies.service';
import { CompanyComponent } from './companies/company/company.component';

import { TechnologiesComponent } from './technologies/technologies.component';
import { TechnologyComponent } from './technologies/technology/technology.component';
import { TechnologiesService } from './technologies/technologies.service';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductsService } from './products/products.service';
import { ProductVersionsComponent } from './products/productversions/productversions.component';
import { ProductVersionsService } from './products/productversions/productversions.service';
import { ProductVersionComponent } from './products/productversions/productversion/productversion.component';
import { ProductFeaturesComponent } from './products/productfeatures/productfeatures.component';
import { ProductFeatureComponent } from './products/productfeatures/productfeature/productfeature.component';
import { ProductFeaturesService } from './products/productfeatures/productfeatures.service';
import { ProductIssuesComponent } from './products/productissues/productissues.component';
import { ProductIssueComponent } from './products/productissues/productissue/productissue.component';
import { ProductConfigsComponent } from './products/productconfigs/productconfigs.component';
import { ProductConfigComponent } from './products/productconfigs/productconfig/productconfig.component';
import { SmaTextareaComponent } from './sma-textarea/sma-textarea.component';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PageNotFoundComponent } from './not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { SemgraphComponent } from './semgraph/semgraph.component';
import { ProjectMembersComponent } from './projects/projectmembers/projectmembers.component';
import { ProjectDetailsComponent } from './projects/projectdetails/projectdetails.component';
import { SemgraphService } from './semgraph/semgraph.service';

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
    PageNotFoundComponent,
    SemgraphComponent,
    ProjectMembersComponent,
    ProjectDetailsComponent
  ],
  providers: [ProjectsService, CompaniesService, TechnologiesService, ProductsService, ProductVersionsService,
    ProductFeaturesService, ContactsService, SemgraphService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
