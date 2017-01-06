import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductFeature } from '../productfeature';
import { ProductFeaturesService } from '../productfeatures.service';

@Component({
  selector: 'app-productfeature',
  templateUrl: './productfeature.component.html',
  styleUrls: ['./productfeature.component.css']
})
export class ProductFeatureComponent implements OnInit {
  productfeature: ProductFeature;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductFeaturesService
  ){}

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.service.getProductFeature(params['productFeatureId']))
    .subscribe((productfeature: ProductFeature) => this.productfeature = productfeature);
  }
}