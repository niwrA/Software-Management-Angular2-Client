import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductVersionsService } from './productversions.service';
import { ProductVersion } from './productversion';

@Component({
  selector: 'app-productversions',
  templateUrl: './productversions.component.html',
  styleUrls: ['./productversions.component.css'],
  providers: [ProductVersionsService]
})
export class ProductVersionsComponent implements OnInit {

  productversions: Array<ProductVersion>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductVersionsService
  ) { }

  selectedProductVersion: ProductVersion;
  searchText: string;

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getProductVersions(params['productId'], ''))
      .subscribe((productversions: Array<ProductVersion>) => this.productversions = productversions);
  }

  onSelect(productVersion: ProductVersion): void {
    this.selectedProductVersion = productVersion;
  }

  clearSelection(): void {
    this.selectedProductVersion = null;
  }

  ProductVersionDetail(event, Product: ProductVersion): void {
/*    event.stopPropagation();
    this.router.navigate(['/Product', Product.Guid]);
*/  }

  getProductVersions(searchText: string): void {
    if (this.productversions) {
      this.service.getProductVersions(this.productversions[0].ProductGuid, searchText)
        .then(productversions => this.productversions = productversions);
    }
  }

  createProductVersion(name: string): void {
    let productversion = this.service.createProductVersion();
    productversion.Name = name;
    this.searchText = '';
    this.getProductVersions('');
  }

}
