import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogActions, MatDialogTitle, MatDialogContent } from '@angular/material';
import { Company } from '../company';

@Component({
  selector: 'app-companies-select',
  templateUrl: './companies-select.component.html',
  styleUrls: ['./companies-select.component.css']
})

export class CompaniesSelectComponent {
  @Input() selectedCompanies: Array<Company> = new Array<Company>();

  constructor(public dialogRef: MatDialogRef<CompaniesSelectComponent>) {}

  confirm(): void {
    this.dialogRef.close(this.selectedCompanies);
  }

  cancel(): void {
    this.selectedCompanies = new Array<Company>();
    this.dialogRef.close(new Array<Company>());
  }

}
