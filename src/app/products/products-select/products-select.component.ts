import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogActions, MatDialogTitle, MatDialogContent } from '@angular/material';
import { Product } from '../product';

@Component({
  selector: 'app-products-select',
  templateUrl: './products-select.component.html',
  styleUrls: ['./products-select.component.css']
})

export class ProductsSelectComponent {
  @Input() selectedProducts: Array<Product> = new Array<Product>();

  constructor(public dialogRef: MatDialogRef<ProductsSelectComponent>) {}

  confirm(): void {
    this.dialogRef.close(this.selectedProducts);
  }

  cancel(): void {
    this.selectedProducts = new Array<Product>();
    this.dialogRef.close(new Array<Product>());
  }

}
