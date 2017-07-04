import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { ProductFeature } from './productfeature';
// import { PRODUCTFEATURES } from './mock-productfeatures';
import * as _ from 'lodash';

@Injectable()
export class ProductFeaturesService {
productfeatures = new Array<ProductFeature>();

  constructor() {
//    this.productfeatures = PRODUCTFEATURES;
  }

  createProductFeature(): ProductFeature {
    let newItem = new ProductFeature;
    newItem.guid = UUID.UUID();
    this.productfeatures.splice(0, 0, newItem);
    return newItem;
  }

  getProductFeatures(productId: string, searchText: string): Promise<ProductFeature[]> {
    if (searchText && searchText.length > 0) {

      let results = _.filter<ProductFeature>(this.productfeatures, prj => prj.productGuid === productId
        && prj.name.indexOf(searchText) > -1);
      return Promise.resolve(results);
    }
    return this.getFeaturesForProduct(productId);
  }

  
  getFeaturesForProduct(productId: string): Promise<ProductFeature[]> {
    if (productId && productId.length > 0) {

      let results = _.filter<ProductFeature>(this.productfeatures, prj => prj.productGuid === productId);
      return Promise.resolve(results);
    }
    return Promise.resolve(this.productfeatures);
  }

  getProductFeature(guid: string): Promise<ProductFeature> {
    return Promise.resolve(this.productfeatures.find(f => f.guid === guid));
  }


}
