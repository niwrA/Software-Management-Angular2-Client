import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../product';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  _productGuid: string;
  product: Product;
  @Input() set productGuid(value: string) {
    this._productGuid = value;
    this.service.getProduct(value)
      .then(product => this.updateProduct(product));
  };

  constructor(private service: ProductsService) { }

  ngOnInit() {
  }

  updateProduct(product: Product) {
    this.product = product;
  }
}
