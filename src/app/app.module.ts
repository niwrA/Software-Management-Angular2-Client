import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FileUploadModule } from 'ng2-file-upload';
import * as _ from 'lodash';
import { AppComponent } from './app.component';

import 'hammerjs';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

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
import { ProductIssuesComponent } from './products/productissues/productissues.component';
import { ProductIssueComponent } from './products/productissues/productissue/productissue.component';
import { SmaTextareaComponent } from './sma-textarea/sma-textarea.component';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PageNotFoundComponent } from './not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { SemgraphComponent } from './semgraph/semgraph.component';
import { ProjectRolesComponent } from './projects/project/projectroles/projectroles.component';
import { ProjectDetailsComponent } from './projects/project/projectdetails/projectdetails.component';
import { SemgraphService } from './semgraph/semgraph.service';
import { CommandsComponent } from './commands/commands.component';
import { CommandsService } from './commands/commands.service';
import { CompanyEnvironmentsComponent } from './companies/company/companyenvironments/companyenvironments.component';
import { UsersComponent } from './admin/users/users.component';
import { UserComponent } from './admin/users/user/user.component';
import { AccessesComponent } from './admin/accesses/accesses.component';
import { AccessComponent } from './admin/accesses/access/access.component';
import { GroupsComponent } from './admin/groups/groups.component';
import { AdminComponent } from './admin/admin.component';
import { UsergroupsComponent } from './admin/usergroups/usergroups.component';
import { GroupaccessesComponent } from './admin/groupaccesses/groupaccesses.component';
import { LoginComponent } from './admin/login/login.component';
import { UiMenuComponent } from './ui-menu/ui-menu.component';
import { ProductDetailsComponent } from './products/product/productdetails/productdetails.component';
import { BarchartComponent } from './shared/barchart/barchart.component';
import { ContactDetailsComponent } from './contacts/contact/contactdetails/contactdetails.component';
import { CompanyDetailsComponent } from './companies/company/companydetails/companydetails.component';
import { CompanyRolesComponent } from './companies/company/companyroles/companyroles.component';
import { EmploymentsComponent } from './employments/employments.component';
import { EmploymentComponent } from './employments/employment/employment.component';
import { EmploymentsService } from './employments/employments.service';
import { CompanyRoleComponent } from './companies/company/companyroles/companyrole/companyrole.component';
import { ContactsSelectComponent } from './contacts/contacts-select/contacts-select.component';
import { ProductVersionDetailsComponent } from './products/productversions/productversion/productversiondetails/productversiondetails.component';
import { CompanyEnvironmentComponent } from './companies/company/companyenvironments/companyenvironment/companyenvironment.component';
import { CompanyEnvironmentDetailsComponent } from './companies/company/companyenvironments/companyenvironment/companyenvironmentdetails/companyenvironmentdetails.component';
import { ProjectRoleAssignmentsComponent } from './projectroleassignments/projectroleassignments.component';
import { ProjectRoleAssignmentComponent } from './projectroleassignments/projectroleassignment/projectroleassignment.component';
import { ProjectRoleAssignmentsService } from './projectroleassignments/projectroleassignments.service';
import { LinksComponent } from './links/links.component';
import { LinksService } from './links/links.service';
import { LinkComponent } from './links/link/link.component';
import { LinkDetailsComponent } from './links/link/linkdetails/linkdetails.component';
import { DesignsComponent } from './designs/designs.component';
import { DesignComponent } from './designs/design/design.component';
import { DesignsService } from './designs/designs.service';
import { DesignDetailsComponent } from './designs/design/designdetails/designdetails.component';
import { EpicElementsComponent } from './designs/design/epic-elements/epic-elements.component';
import { EpicElementComponent } from './designs/design/epic-elements/epic-element/epic-element.component';
import { EntityElementsComponent } from './designs/design/entity-elements/entity-elements.component';
import { EntityElementComponent } from './designs/design/entity-elements/entity-element/entity-element.component';
import { PropertyElementsComponent } from './designs/design/property-elements/property-elements.component';
import { PropertyElementComponent } from './designs/design/property-elements/property-element/property-element.component';
import { CommandElementsComponent } from './designs/design/command-elements/command-elements.component';
import { CommandElementComponent } from './designs/design/command-elements/command-element/command-element.component';
import { EpicElementDetailsComponent } from './designs/design/epic-elements/epic-element/epic-element-details/epic-element-details.component';
import { EntityElementDetailsComponent } from './designs/design/entity-elements/entity-element/entity-element-details/entity-element-details.component';
import { PropertyElementDetailsComponent } from './designs/design/property-elements/property-element/property-element-details/property-element-details.component';
import { CommandElementDetailsComponent } from './designs/design/command-elements/command-element/command-element-details/command-element-details.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FilesComponent } from './files/files.component';
import { FileComponent } from './files/file/file.component';
import { FileDetailsComponent } from './files/file/file-details/file-details.component';
import { FilesService } from './files/files.service';
import { FilePreviewComponent } from './files/file/file-preview/file-preview.component';
import { ContactCardComponent } from './contacts/contact/contact-card/contact-card.component';
import { RegisterComponent } from './admin/register/register.component';

import { AccountService } from './admin/account.service';
import { ProductFeatureDetailsComponent } from './products/productfeatures/productfeature/productfeaturedetails/productfeaturedetails.component';
import { ProductIssueDetailsComponent } from './products/productissues/productissue/productissuedetails/productissuedetails.component';
import { CompanyEnvironmentHardwareComponent } from './companies/company/companyenvironments/companyenvironment/hardware/company-environment-hardware.component';
import { CompanyEnvironmentHardwareItemComponent } from './companies/company/companyenvironments/companyenvironment/hardware/hardware-item/company-environment-hardware-item.component';
import { CompanyEnvironmentHardwareItemDetailsComponent } from './companies/company/companyenvironments/companyenvironment/hardware/hardware-item/hardware-item-details/company-environment-hardware-item-details.component';
import { DatabasesComponent } from './companies/company/companyenvironments/companyenvironment/databases/databases.component';
import { DatabaseComponent } from './companies/company/companyenvironments/companyenvironment/databases/database/database.component';
import { DatabaseDetailsComponent } from './companies/company/companyenvironments/companyenvironment/databases/database/database-details/database-details.component';
import { AccountsComponent } from './companies/company/companyenvironments/companyenvironment/accounts/accounts.component';
import { AccountComponent } from './companies/company/companyenvironments/companyenvironment/accounts/account/account.component';
import { AccountDetailsComponent } from './companies/company/companyenvironments/companyenvironment/accounts/account/account-details/account-details.component';
import { MyMaterialModule} from './modules/app.materials.module';
import { RouterLinkStubDirective } from '../testing/router-stubs';
import { ProductConfigOptionsComponent } from './products/productconfigoptions/productconfigoptions.component';
import { ProductConfigOptionComponent } from './products/productconfigoptions/productconfigoption/productconfigoption.component';
import { ProductConfigOptionDetailsComponent } from './products/productconfigoptions/productconfigoption/productconfigoptiondetails/productconfigoptiondetails.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(),
    MyMaterialModule,
    FileUploadModule,
    FlexLayoutModule],
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
    ContactComponent,
    SmaTextareaComponent,
    PageNotFoundComponent,
    SemgraphComponent,
    ProjectRolesComponent,
    ProjectDetailsComponent,
    CommandsComponent,
    CompanyEnvironmentsComponent,
    UsersComponent,
    UserComponent,
    AccessComponent,
    AccessesComponent,
    GroupsComponent,
    AdminComponent,
    UsergroupsComponent,
    GroupaccessesComponent,
    LoginComponent,
    UiMenuComponent,
    ProductDetailsComponent,
    BarchartComponent,
    ContactDetailsComponent,
    CompanyDetailsComponent,
    CompanyRolesComponent,
    EmploymentsComponent,
    EmploymentComponent,
    CompanyRoleComponent,
    ContactsSelectComponent,
    ProductVersionDetailsComponent,
    CompanyEnvironmentComponent,
    CompanyEnvironmentDetailsComponent,
    ProjectRoleAssignmentsComponent,
    ProjectRoleAssignmentComponent,
    LinksComponent,
    LinkComponent,
    LinkDetailsComponent,
    DesignsComponent,
    DesignComponent,
    DesignDetailsComponent, EpicElementsComponent,
    EpicElementComponent, EntityElementsComponent, EntityElementComponent, PropertyElementsComponent,
    PropertyElementComponent, CommandElementsComponent, CommandElementComponent, EpicElementDetailsComponent,
    EntityElementDetailsComponent, PropertyElementDetailsComponent, CommandElementDetailsComponent,
    FileUploadComponent, FilesComponent, FileComponent, FileDetailsComponent, FilePreviewComponent,
    ContactCardComponent, RegisterComponent, ProductFeatureDetailsComponent, ProductIssueDetailsComponent,
    CompanyEnvironmentHardwareComponent, CompanyEnvironmentHardwareItemComponent,
    CompanyEnvironmentHardwareItemDetailsComponent, DatabasesComponent, DatabaseComponent, DatabaseDetailsComponent,
    AccountsComponent, AccountComponent, AccountDetailsComponent, RouterLinkStubDirective, ProductConfigOptionComponent,
    ProductConfigOptionsComponent, ProductConfigOptionComponent, ProductConfigOptionDetailsComponent
  ],
  providers: [ProjectsService, ProjectRoleAssignmentsService, CompaniesService,
    TechnologiesService, ProductsService, ProductVersionsService,
    DesignsService, ContactsService, EmploymentsService,
    LinksService, FilesService, SemgraphService, CommandsService,
    NotificationsService, AccountService],
  bootstrap: [AppComponent],
  entryComponents: [ContactsSelectComponent, FilePreviewComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
