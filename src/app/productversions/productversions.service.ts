import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { ProductVersion } from './productversion';
import { PRODUCTVERSIONS } from './mock-productversions';
import * as _ from 'lodash';

@Injectable()
export class ProductVersionsService {
productversions = new Array<ProductVersion>();

  constructor() {
    this.productversions = PRODUCTVERSIONS;
  }

  createProductVersion(): ProductVersion {
    let newItem = new ProductVersion;
    newItem.Guid = UUID.UUID();
    this.productversions.splice(0, 0, newItem);
    return newItem;
  }

  getProductVersions(searchText: string): Promise<ProductVersion[]> {
    if (searchText && searchText.length > 0) {

      let results = _.filter<ProductVersion>(this.productversions, prj => prj.Name.indexOf(searchText) > -1);
      return Promise.resolve(results);
    }
    return Promise.resolve(this.productversions);
  }

  
  getVersionsForProduct(productId: string): Promise<ProductVersion[]> {
    if (productId && productId.length > 0) {

      let results = _.filter<ProductVersion>(this.productversions, prj => prj.ProductGuid === productId);
      return Promise.resolve(results);
    }
    return Promise.resolve(this.productversions);
  }

  getProductVersion(guid: string): Promise<ProductVersion> {
    return Promise.resolve(this.productversions.find(f => f.Guid === guid));
  }

}
