import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Product } from './product';
import { PRODUCTS } from './mock-products';
import * as _ from 'lodash';

@Injectable()
export class ProductsService {
products = new Array<Product>();

  constructor() {
    this.products = PRODUCTS;
  }

  createProduct(): Product {
    let newItem = new Product;
    newItem.Guid = UUID.UUID();
    this.products.splice(0, 0, newItem);
    return newItem;
  }

  getProducts(searchText: string): Promise<Product[]> {
    if (searchText && searchText.length > 0) {

      let results = _.filter<Product>(this.products, prj => prj.Name.indexOf(searchText) > -1);
      return Promise.resolve(results);
    }
    return Promise.resolve(this.products);
  }

  getProduct(guid: string): Promise<Product> {
    return Promise.resolve(this.products.find(f => f.Guid === guid));
  }

}
