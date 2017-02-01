import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() products = new Array<Product>();
  @Input() canAdd: Boolean;
  selectedProduct: Product;
  searchText: string;

  constructor(private productsService: ProductsService) {
    this.products = productsService.products;
  }

  ngOnInit() {
    this.getProducts();
  }

  onSelect(company: Product): void {
    this.selectedProduct = company;
  }

  clearSelection(): void {
    this.selectedProduct = null;
  }

  getProducts(): void {
    this.productsService.getProducts(this.searchText).then(products => this.products = products);
  }

  createProduct(name: string): void {
    const product = this.productsService.createProduct(true, name);
    this.getProducts();
  }

  deleteProduct(product: Product): void {
    this.productsService.deleteProduct(product);
    const index = this.products.indexOf(product, 0);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
  }
}
