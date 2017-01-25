import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { Product } from './product';
import { PRODUCTS } from './mock-products';
import { CommandsService } from '../commands/commands.service';
import { ProductCommand, CreateProductCommand, DeleteProductCommand, RenameProductCommand } from './product/product.commands';
import * as _ from 'lodash';

@Injectable()
export class ProductsService {
  productsUrl = 'http://localhost:50274/api/products';
  products = new Array<Product>();

  constructor(private commandsService: CommandsService, private http: Http) {
    this.getProducts('').then(result => this.products = result as Array<Product>);
  }

  createProduct(doSave: boolean, name?: string): Product {
    let newItem = new Product;
    newItem.guid = UUID.UUID();
    newItem.name = name;
    this.products.splice(0, 0, newItem);
    if (doSave) {
      this.products.splice(0, 0, newItem);
      let createProductCommand = new CreateProductCommand(newItem);
      this.commandsService.postCommand(createProductCommand, false);
    }
    return newItem;
  }

  deleteProduct(product: Product): void {
    let index = this.products.indexOf(product, 0);
    if (index > -1) {
      this.products.splice(index, 1);
    }
    this.postCommand(new DeleteProductCommand(product), false);
  }

  cloneProduct(original: Product): Product {
    if (original) {
      let clonedItem = this.createProduct(false);
      clonedItem.description = original.description;
      clonedItem.name = original.name;
      clonedItem.businessCase = original.businessCase;
      return clonedItem;
    }
  }

  getProducts(searchText: string): Promise<Array<Product>> {
    if (this.products.length > 0) {
      if (searchText && searchText.length > 0) {
        let results = _.filter<Product>(this.products, prj => prj.name.indexOf(searchText) > -1);
        return Promise.resolve(results);
      } else { return Promise.resolve(this.products); }
    } else {
      return this.http.get(this.productsUrl)
        .toPromise()
        .then(response => response.json() as Array<Product>)
        .catch(this.handleError);
    }
  }

  getProduct(guid: string): Promise<Product> {
    if (this.products.length > 0) {
      let result = _.find(this.products, prj => prj.guid === guid);
      return Promise.resolve(result);
    } else {
      return this.http.get(this.productsUrl + '/' + guid)
        .toPromise()
        .then(response => response.json() as Product)
        .catch(this.handleError);
    }
  }

  postCommand(command: ProductCommand, replaceOriginal: boolean) {
    this.commandsService.postCommand(command, replaceOriginal);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
