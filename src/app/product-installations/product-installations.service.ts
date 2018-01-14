import { Injectable, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { ProductInstallation, ProductInstallationState } from './productinstallation';
import { CommandsService } from '../commands/commands.service';
import { NotificationsService } from 'angular2-notifications';
import {
  ProductInstallationCommand, CreateProductInstallationCommand,
  DeleteProductInstallationCommand
} from './product-installation/product-installation.commands';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Company, CompanyState } from '../companies/company';

@Injectable()
export class ProductInstallationsService {
  productinstallationsUrl = environment.productinstallationsUrl;
  productinstallations = new Array<ProductInstallation>();

  constructor(private commandsService: CommandsService, private http: Http, private notificationService: NotificationsService) {
    this.getProductInstallations().then(result => this.productinstallations = result as Array<ProductInstallation>);
  }

  createProductInstallation(doSave: boolean, companyGuid: string,  productGuid: string, companyEnvironmentGuid: string,
    productVersionGuid: string, post: boolean): ProductInstallation {
    const newItem = new ProductInstallation();
    newItem.guid = UUID.UUID();
    newItem.companyGuid = companyGuid;
    newItem.productGuid = productGuid;
    newItem.companyEnvironmentGuid = companyEnvironmentGuid;
    newItem.productVersionGuid = productVersionGuid;
    if (doSave) {
      this.productinstallations.splice(0, 0, newItem);
      if (post) {
        const createProductInstallationCommand = new CreateProductInstallationCommand(newItem);
        this.commandsService.postCommand(createProductInstallationCommand, false);
      }
    }
    return newItem;
  }

  postProductInstallations(productinstallations: Array<ProductInstallation>) {
    const commands = new Array<ProductInstallationCommand>();
    for (const productinstallation of productinstallations) {
      const createProductInstallationCommand = new CreateProductInstallationCommand(productinstallation);
      commands.push(createProductInstallationCommand);
    }
    this.commandsService.postCommands(commands, false);
  }

  deleteProductInstallation(productinstallation: ProductInstallation): void {
    const index = this.productinstallations.indexOf(productinstallation, 0);
    if (index > -1) {
      this.productinstallations.splice(index, 1);
    }
    this.postCommand(new DeleteProductInstallationCommand(productinstallation), false);
  }

  cloneProductInstallation(original: ProductInstallation): ProductInstallation {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }

  filterProductInstallations(productinstallations: Array<ProductInstallation>, productGuid?: string, companyGuid?: string) {
    if (productGuid !== null) {
      const results = _.filter<ProductInstallation>(productinstallations, prj => prj.productGuid === productGuid);
      return Promise.resolve(results);
    } else if (companyGuid !== null) {
      const results = _.filter<ProductInstallation>(productinstallations, prj => prj.companyGuid === companyGuid);
      return Promise.resolve(results);
    }
  }

  getProductInstallations(productGuid?: string, companyGuid?: string): Promise<Array<ProductInstallation>> {
    if (this.productinstallations.length > 0) {
      return this.filterProductInstallations(this.productinstallations, productGuid, companyGuid);
    } else {
      return this.http.get(this.productinstallationsUrl)
        .toPromise()
        .then(response => this.parseResponse(response, this.productinstallations))
        .then(productinstallations => this.filterProductInstallations(productinstallations, productGuid, companyGuid))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  getCompanys(productGuid): Promise<Array<Company>> {
    return this.http.get(this.productinstallationsUrl + '/getcompaniesbyproductroleid/' + productGuid)
      .toPromise()
      .then(response => this.parseCompanysResponse(response))
      .catch(error => this.handleError(error, this.notificationService));
  }

  getCompanysByProjectGuid(productGuid): Promise<Array<Company>> {
    return this.http.get(this.productinstallationsUrl + '/getcompaniesbyproductid/' + productGuid)
      .toPromise()
      .then(response => this.parseCompanysResponse(response))
      .catch(error => this.handleError(error, this.notificationService));
  }

  parseCompanysResponse(response: any): Array<Company> {
    const states = response.json() as Array<CompanyState>;
    const companies = new Array<Company>();
    for (const state of states) {
      companies.push(new Company(state));
    }
    return companies;
  }

  parseResponse(response: any, productinstallations: Array<ProductInstallation>): Array<ProductInstallation> {
    const states = response.json() as Array<ProductInstallationState>;
    productinstallations = new Array<ProductInstallation>();
    for (const state of states) {
      const productinstallation = new ProductInstallation(state);
      productinstallations.push(productinstallation);
      // this.productinstallations.push(productinstallation);
    }
    return productinstallations;
  }

  getProductInstallation(guid: string): Promise<ProductInstallation> {
    if (this.productinstallations.length > 0) {
      const result = _.find(this.productinstallations, prj => prj.guid === guid);
      return Promise.resolve(result);
    } else {
      return this.http.get(this.productinstallationsUrl + '/' + guid)
        .toPromise()
        .then(response => new ProductInstallation(response.json() as ProductInstallationState))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  postCommand(command: ProductInstallationCommand, replaceOriginal: boolean) {
    this.commandsService.postCommand(command, replaceOriginal);
  }

  private handleError(error: any, notificationService: NotificationsService): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    notificationService.error('An error occurred', error, { timeOut: 5000, clickToClose: false });
    return Promise.reject(error.message || error);
  }
}
