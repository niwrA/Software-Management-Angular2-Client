
import {map} from 'rxjs/operators';

import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductFeature } from '../productfeature';
import { Product } from '../../product';
import { ProductsService } from '../../products.service';
import { NavLink } from '../../../shared/appnavbar/navlink';

@Component({
  selector: 'app-productfeature',
  templateUrl: './productfeature.component.html',
  styleUrls: ['./productfeature.component.css']
})
export class ProductFeatureComponent implements OnInit {
  productfeature: ProductFeature;
  productId: string;
  featureId: string;
  product: Product;
  public navLinks = new Array<NavLink>(
    new NavLink('details', 'Details', true),
    new NavLink('issues', 'Issues', false),
    new NavLink('configoptions', 'Config Options', false),
    new NavLink('requestedby', 'Requested By', false),
    new NavLink('links', 'Links', false),
    new NavLink('files', 'Files', false),
    new NavLink('commands', 'Audit', false)
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService) { }

  ngOnInit() {
    this.route.params.pipe(map(params => [params['productId'], params['productFeatureId']]))
      .subscribe(([productId, featureId]) => {
        this.getProductFeature(productId, featureId);
      });
  }

  getProductFeature(productId: string, featureId: string): void {
    if (productId && featureId) {
      this.productId = productId;
      this.service.getProduct(productId).then(product => this.product = product);
      this.featureId = featureId;
      this.service.getProductFeature(productId, featureId).then(productFeature => this.productfeature = productFeature);
    }
  }
}
