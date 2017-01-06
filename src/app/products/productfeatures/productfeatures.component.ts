import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductFeaturesService } from './productfeatures.service';
import { ProductFeature } from './productfeature';

@Component({
  selector: 'app-productfeatures',
  templateUrl: './productfeatures.component.html',
  styleUrls: ['./productfeatures.component.css'],
  providers: [ProductFeaturesService]
})
export class ProductFeaturesComponent implements OnInit {

  productfeatures: Array<ProductFeature>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductFeaturesService
  ){}

  selectedProductFeature: ProductFeature;
  searchText: string;

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getProductFeatures(params['productId'],''))
    .subscribe((productfeatures: Array<ProductFeature>) => this.productfeatures = productfeatures);
  }

  onSelect(productFeature: ProductFeature): void {
    this.selectedProductFeature = productFeature;
  }

  clearSelection(): void {
    this.selectedProductFeature = null;
  }

  ProductFeatureDetail(event, Product: ProductFeature): void {
/*    event.stopPropagation();
    this.router.navigate(['/Product', Product.Guid]);
*/  }

  getProductFeatures(searchText: string): void {
    if(this.productfeatures){
      this.service.getProductFeatures(this.productfeatures[0].ProductGuid, searchText)
      .then(productfeatures => this.productfeatures = productfeatures);
    }
  }

  createProductFeature(name: string): void {
    let productfeature = this.service.createProductFeature();
    productfeature.Name = name;
    this.searchText = '';
    this.getProductFeatures('');
  }

}
