import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {

  products = new Array<Product>();
  selectedProduct: Product;
  searchText: string;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.getProducts('');
  }

  onSelect(company: Product): void {
    this.selectedProduct = company;
  }

  clearSelection(): void {
    this.selectedProduct = null;
  }

  ProductDetail(event, Product: Product): void {
/*    event.stopPropagation();
    this.router.navigate(['/Product', Product.Guid]);
*/  }

  getProducts(searchText: string): void {
    this.productsService.getProducts(searchText).then(products => this.products = products);
  }

  createProduct(name: string): void {
    let product = this.productsService.createProduct();
    product.Name = name;
    this.searchText = '';
    this.getProducts('');
  }

}
