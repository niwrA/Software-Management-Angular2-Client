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

  selectedProduct: ProductVersion;
  searchText: string;

  constructor(private productVersionsService: ProductVersionsService) { }

  ngOnInit() {
    // this.getProductVersions('');
  }

  onSelect(company: ProductVersion): void {
    this.selectedProduct = company;
  }

  clearSelection(): void {
    this.selectedProduct = null;
  }

  ProductVersionDetail(event, Product: ProductVersion): void {
/*    event.stopPropagation();
    this.router.navigate(['/Product', Product.Guid]);
*/  }

  getProductVersions(searchText: string): void {
    this.productVersionsService.getProductVersions(searchText).then(productversions => this.productversions = productversions);
  }

  createProductVersion(name: string): void {
    let productversion = this.productVersionsService.createProductVersion();
    productversion.Name = name;
    this.searchText = '';
    this.getProductVersions('');
  }

}
