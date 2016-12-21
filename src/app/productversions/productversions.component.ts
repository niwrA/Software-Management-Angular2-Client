import { Component, OnInit, Input } from '@angular/core';
import { ProductVersionsService } from './productversions.service';
import { ProductVersion } from './productversion';

@Component({
  selector: 'app-productversions',
  templateUrl: './productversions.component.html',
  styleUrls: ['./productversions.component.css'],
  providers: [ProductVersionsService]
})
export class ProductVersionsComponent implements OnInit {

  @Input() productversions;

  selectedProductVersion: ProductVersion;
  searchText: string;

  constructor(private productVersionsService: ProductVersionsService) { }

  ngOnInit() {
    // this.getProductVersions('');
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
    if(this.productversions){
      this.productVersionsService.getProductVersions(this.productversions[0].ProductGuid, searchText)
      .then(productversions => this.productversions = productversions);
    }
  }

  createProductVersion(name: string): void {
    let productversion = this.productVersionsService.createProductVersion();
    productversion.Name = name;
    this.searchText = '';
    this.getProductVersions('');
  }

}
