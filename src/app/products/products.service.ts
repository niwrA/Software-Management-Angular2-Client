import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { Product, ProductState } from './product';
import { ProductVersion, ProductVersionState } from './productversions/productversion';
import { ProductFeature, ProductFeatureState } from './productfeatures/productfeature';
import { ProductConfigOption, ProductConfigOptionState } from './productconfigoptions/productconfigoption';
import { ProductIssue } from './productissues/productissue';
import { PRODUCTS } from './mock-products';
import { CommandsService } from '../commands/commands.service';
import { NotificationsService } from 'angular2-notifications';
import {
  ProductCommand, CreateProductCommand, DeleteProductCommand,
  RenameProductCommand, AddVersionToProductCommand, AddFeatureToProductCommand,
  RequestFeatureForProductCommand, RemoveFeatureFromProductCommand, RemoveVersionFromProductCommand,
  AddIssueToProductCommand, RemoveIssueFromProductCommand, AddConfigOptionToProductCommand,
  RemoveConfigOptionFromProductFeatureCommand, AddChildToProductConfigOptionCommand, RemoveChildFromProductConfigOptionCommand
} from './product/product.commands';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { pack } from 'd3';

@Injectable()
export class ProductsService {
  productsUrl = environment.productsUrl;
  products = new Array<Product>();

  constructor(private commandsService: CommandsService, private http: Http, private notificationService: NotificationsService) {
    this.getProducts('').then(result => this.products = result as Array<Product>);
  }

  createProduct(doSave: boolean, name?: string): Product {
    const newItem = new Product;
    newItem.guid = UUID.UUID();
    newItem.name = name;
    if (doSave) {
      this.products.splice(0, 0, newItem);
      const createProductCommand = new CreateProductCommand(newItem);
      this.commandsService.postCommand(createProductCommand, false);
    }
    return newItem;
  }

  createProductVersion(doSave: boolean, product: Product, name: string): ProductVersion {
    const newItem = new ProductVersion();
    newItem.guid = UUID.UUID();
    newItem.name = name;
    newItem.productGuid = product.guid;
    const serviceProduct = _.find(this.products, function (s: Product) { return s.guid === product.guid; });
    if (doSave) {
      // todo: figure out why these aren't the same
      product.addVersion(newItem);
      serviceProduct.addVersion(newItem);
      const createProductCommand = new AddVersionToProductCommand(product, newItem);
      this.commandsService.postCommand(createProductCommand, false);
    }
    return newItem;
  }

  getProductVersion(productGuid: string, versionGuid: string): Promise<ProductVersion> {
    if (productGuid && versionGuid) {
      const version = this.getProduct(productGuid).then(product => _.find<ProductVersion>(product.versions, t => t.guid === versionGuid));
      return version;
    }
  }

  createProductFeature(doSave: boolean, product: Product, name: string, versionId: string): ProductFeature {
    const newItem = new ProductFeature();
    newItem.guid = UUID.UUID();
    newItem.name = name;
    newItem.firstVersionGuid = versionId;
    newItem.productGuid = product.guid;
    if (doSave) {
      product.features.splice(0, 0, newItem);
      const createProductCommand = new AddFeatureToProductCommand(product, newItem);
      this.commandsService.postCommand(createProductCommand, false);
    }
    return newItem;
  }

  requestProductFeature(doSave: boolean, product: Product, name: string, versionId: string): ProductFeature {
    const newItem = new ProductFeature();
    newItem.guid = UUID.UUID();
    newItem.name = name;
    newItem.requestedForVersionGuid = versionId;
    newItem.isRequest = true;
    newItem.productGuid = product.guid;
    if (doSave) {
      product.features.splice(0, 0, newItem);
      const command = new RequestFeatureForProductCommand(product, newItem);
      this.commandsService.postCommand(command, false);
    }
    return newItem;
  }


  getProductFeature(productGuid: string, featureGuid: string): Promise<ProductFeature> {
    if (productGuid && featureGuid) {
      const feature = this.getProduct(productGuid).then(product => _.find<ProductFeature>(product.features, t => t.guid === featureGuid));
      return feature;
    }
  }

  createProductIssue(doSave: boolean, product: Product, name: string, versionId: string): ProductIssue {
    const newItem = new ProductIssue();
    const version = _.find(product.versions, t => t.guid === versionId);
    newItem.guid = UUID.UUID();
    newItem.name = name;
    newItem.firstVersionGuid = versionId;
    newItem.firstVersionSequence = version.sequence;
    newItem.productGuid = product.guid;
    if (doSave) {
      product.issues.splice(0, 0, newItem);
      const createProductCommand = new AddIssueToProductCommand(product, newItem);
      this.commandsService.postCommand(createProductCommand, false);
    }
    return newItem;
  }

  createProductConfigOption(doSave: boolean, product: Product, productFeature: ProductFeature, name: string): ProductConfigOption {
    const newItem = new ProductConfigOption();
    newItem.guid = UUID.UUID();
    newItem.name = name;
    newItem.productGuid = product.guid;
    newItem.productFeatureGuid = productFeature.guid;
    if (doSave) {
      product.configoptions.splice(0, 0, newItem);
      const createProductConfigCommand = new AddConfigOptionToProductCommand(product, productFeature, newItem);
      this.commandsService.postCommand(createProductConfigCommand, false);
    }
    return newItem;
  }

  createProductConfigOptionChild(doSave: boolean, product: Product, parent: ProductConfigOption, name: string): ProductConfigOption {
    const newItem = new ProductConfigOption();
    newItem.guid = UUID.UUID();
    newItem.name = name;
    newItem.productGuid = parent.productGuid;
    newItem.parentGuid = parent.guid;
    newItem.productFeatureGuid = parent.productFeatureGuid;
    if (doSave) {
      product.configoptions.splice(0, 0, newItem);
      const createProductConfigCommand = new AddChildToProductConfigOptionCommand(newItem, product);
      this.commandsService.postCommand(createProductConfigCommand, false);
    }
    return newItem;
  }
  removeChildFromProductConfigOption(product: Product, configoption: ProductConfigOption, parent: ProductConfigOption): void {
    const index = product.configoptions.indexOf(configoption, 0);
    if (index > -1) {
      product.configoptions.splice(index, 1);
    }
    this.postCommand(new RemoveChildFromProductConfigOptionCommand(configoption, parent, product), false);
  }


  getProductIssue(productGuid: string, issueGuid: string): Promise<ProductIssue> {
    if (productGuid && issueGuid) {
      const issue = this.getProduct(productGuid).then(product => _.find<ProductIssue>(product.issues, t => t.guid === issueGuid));
      return issue;
    }
  }
  deleteProductIssue(product: Product, productissue: ProductIssue): void {
    const index = product.issues.indexOf(productissue, 0);
    if (index > -1) {
      product.issues.splice(index, 1);
    }
    this.postCommand(new RemoveIssueFromProductCommand(product, productissue), false);
  }
  deleteProductConfigOption(product: Product, productfeature: ProductFeature, configoption: ProductConfigOption): void {
    const index = product.configoptions.indexOf(configoption, 0);
    if (index > -1) {
      product.configoptions.splice(index, 1);
    }
    this.postCommand(new RemoveConfigOptionFromProductFeatureCommand(product, configoption), false);
  }

  deleteProduct(product: Product): void {
    const index = this.products.indexOf(product, 0);
    if (index > -1) {
      this.products.splice(index, 1);
    }
    this.postCommand(new DeleteProductCommand(product), false);
  }

  deleteProductFeature(product: Product, productfeature: ProductFeature): void {
    const index = product.features.indexOf(productfeature, 0);
    if (index > -1) {
      product.features.splice(index, 1);
    }
    this.postCommand(new RemoveFeatureFromProductCommand(product, productfeature), false);
  }

  deleteProductVersion(product: Product, productversion: ProductVersion): void {
    const index = product.versions.indexOf(productversion, 0);
    if (index > -1) {
      product.versions.splice(index, 1);
    }
    this.postCommand(new RemoveVersionFromProductCommand(product, productversion), false);
  }

  cloneProduct(original: Product): Product {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }

  cloneProductFeature(original: ProductFeature): ProductFeature {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }
  cloneProductIssue(original: ProductIssue): ProductIssue {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }
  cloneProductConfigOption(original: ProductConfigOption): ProductConfigOption {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }

  getProducts(searchText: string): Promise<Array<Product>> {
    if (this.products.length > 0) {
      if (searchText && searchText.length > 0) {
        const results = _.filter<Product>(this.products, prj => prj.name.indexOf(searchText) > -1);
        return Promise.resolve(results);
      } else { return Promise.resolve(this.products); }
    } else {
      return this.http.get(this.productsUrl)
        .toPromise()
        .then(response => this.parseResponse(response, this.products))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  // todo: this should also get all products if not yet retrieved
  getProduct(guid: string): Promise<Product> {
    if (this.products.length > 0) {
      const result = _.find(this.products, prj => prj.guid === guid);
      return Promise.resolve(result);
    } else {
      return this.http.get(this.productsUrl + '/' + guid)
        .toPromise()
        .then(response => this.parseSingleResponse(response, this.products))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  parseSingleResponse(response: any, Products: Array<Product>): Product {
    const product = new Product(response.json() as ProductState);
    if (!Products.indexOf(product)) {
      Products.push(product);
    }
    return product;
  }

  parseResponse(response: any, Products: Array<Product>): Array<Product> {
    const states = response.json() as Array<ProductState>;
    Products = new Array<Product>();
    for (const state of states) {
      Products.push(new Product(state));
    }
    return Products;
  }

  postCommand(command: ProductCommand, replaceOriginal: boolean) {
    this.commandsService.postCommand(command, replaceOriginal);
  }

  private handleError(error: any, notificationService: NotificationsService): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    this.notificationService.error('An error occurred', error, { timeOut: 5000, clickToClose: false });
    return Promise.reject(error.message || error);
  }

}
