import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { Product, ProductState } from './product';
import { ProductVersion, ProductVersionState } from './productversions/productversion';
import { PRODUCTS } from './mock-products';
import { CommandsService } from '../commands/commands.service';
import { NotificationsService } from 'angular2-notifications';
import {
  ProductCommand, CreateProductCommand, DeleteProductCommand,
  RenameProductCommand, AddVersionToProductCommand
} from './product/product.commands';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';

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
    if (doSave) {
      product.versions.splice(0, 0, newItem);
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

  deleteProduct(product: Product): void {
    const index = this.products.indexOf(product, 0);
    if (index > -1) {
      this.products.splice(index, 1);
    }
    this.postCommand(new DeleteProductCommand(product), false);
  }

  cloneProduct(original: Product): Product {
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
    Products.push(product);
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
