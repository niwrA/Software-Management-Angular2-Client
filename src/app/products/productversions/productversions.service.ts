// todo: get rid of this, put all in products service
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Product } from '../product';
import { ProductVersion } from './productversion';
import { PRODUCTVERSIONS } from './mock-productversions';
import { CommandsService } from '../../commands/commands.service';
import { AddVersionToProductCommand } from '../product/product.commands';
import * as _ from 'lodash';

@Injectable()
export class ProductVersionsService {
  productversions = new Array<ProductVersion>();
  
  constructor(private commandsService: CommandsService) {
  }

  createProductVersion(doSave: boolean, product: Product): ProductVersion {
    const newItem = new ProductVersion();
    newItem.guid = UUID.UUID();
    newItem.name = name;
    if (doSave) {
      this.productversions.splice(0, 0, newItem);
      const createProductCommand = new AddVersionToProductCommand(product, newItem);
      this.commandsService.postCommand(createProductCommand, false);
    }
    return newItem;
  }

  getProductVersions(productId: string, searchText: string): Promise<ProductVersion[]> {
    if (searchText && searchText.length > 0) {
      const results = _.filter<ProductVersion>(this.productversions, prj => prj.productGuid === productId
        && prj.name.indexOf(searchText) > -1);
      return Promise.resolve(results);
    }
    return this.getVersionsForProduct(productId);
  }

  getVersionsForProduct(productId: string): Promise<ProductVersion[]> {
    if (productId && productId.length > 0) {
      const results = _.filter<ProductVersion>(this.productversions, prj => prj.productGuid === productId);
      return Promise.resolve(results);
    }
    return Promise.resolve(this.productversions);
  }

  getProductVersion(guid: string): Promise<ProductVersion> {
    return Promise.resolve(this.productversions.find(f => f.guid === guid));
  }

}
