import { Component, Input, OnInit } from '@angular/core';
import { CompaniesService } from './companies.service';
import { Company } from './company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit {
  @Input() companies = new Array<Object>();
  @Input() canAdd: Boolean;
  selectedCompany: Company;
  searchText: string;

  constructor(private companiesService: CompaniesService) {
    this.companies = companiesService.companies;
   }

  ngOnInit() {
    this.getCompanies();
  }

  onSelect(company: Company): void {
    this.selectedCompany = company;
  }

  clearSelection(): void {
    this.selectedCompany = null;
  }

  getCompanies(): void {
    this.companiesService.getCompanies(this.searchText).then(companies => this.companies = companies);
  }

  updateCompanies(companies: Array<Company>): void {
    this.companies = companies;
  }

  createCompany(name: string): void {
    const company = this.companiesService.createCompany(true, name);
    this.getCompanies();
  }

  deleteCompany(company: Company): void {
    this.companiesService.deleteCompany(company);
    this.companies = this.companiesService.companies;
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
  }

}
