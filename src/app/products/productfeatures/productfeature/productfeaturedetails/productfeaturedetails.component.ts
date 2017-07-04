import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductFeature } from '../../productfeature';
import { ProductsService } from '../../../products.service';
import { RenameProductFeatureCommand } from '../../../product/product.commands';
@Component({
  selector: 'app-productfeaturedetails',
  templateUrl: './productfeaturedetails.component.html',
  styleUrls: ['./productfeaturedetails.component.css']
})
export class ProductFeatureDetailsComponent implements OnInit {
  productfeature: ProductFeature;
  previousProductFeature: ProductFeature;
  productId: string;
  featureId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService) { }

  ngOnInit() {
    this.route.parent.params.map(params => [params['productId'], params['productFeatureId']])
      .subscribe(([productId, featureId]) => {
        this.getProductFeature(productId, featureId);
      });
  }
  update(newValue) {
    this.previousProductFeature = this.service.cloneProductFeature(newValue);
    this.productfeature = newValue;
  }

  getProductFeature(productId: string, featureId: string): void {
    if (productId && featureId) {
      this.productId = productId;
      this.featureId = featureId;
      this.service.getProductFeature(productId, featureId).then(productFeature => this.update(productFeature));
    }
  }

  changeName(): void {
    if (this.previousProductFeature !== undefined) {
      if (this.productfeature.name !== this.previousProductFeature.name) {
        const renameCommand = new RenameProductFeatureCommand(this.productfeature, this.previousProductFeature.name);
        this.service.postCommand(renameCommand, false);
        this.previousProductFeature.name = this.productfeature.name;
      }
    } else {
      this.previousProductFeature = this.productfeature;
    }
  }
}
