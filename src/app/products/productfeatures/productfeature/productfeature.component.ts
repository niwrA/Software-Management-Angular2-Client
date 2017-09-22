import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductFeature } from '../productfeature';
import { Product } from '../../product';
import { ProductsService } from '../../products.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService) { }

  ngOnInit() {
    this.route.params.map(params => [params['productId'], params['productFeatureId']])
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