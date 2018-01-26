import { Component, Input, OnInit } from '@angular/core';
import { CompaniesService } from './companies.service';
import { Company } from './company';
import * as _ from 'lodash';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit {
  @Input() companies = new Array<Company>();
  @Input() canAdd: Boolean;
  @Input() selectedCompanies = new Array<Company>();
  filteredCompanies = new Array<Company>();
  selectedCompany: Company;
  searchText: string;
  // todo: this will be a separate component
  views = [
    { value: 'cards', viewValue: 'Cards' },
    { value: 'list', viewValue: 'List' }
  ];
  selectedView: string;

  constructor(private companiesService: CompaniesService) {
    this.getCompanies();
  }

  ngOnInit() {
    this.selectedView = 'list';
    this.searchText = '';
    this.getCompanies();
  }

  onSelect(company: Company): void {
    this.selectedCompany = company;
  }

  clearSelection(): void {
    this.selectedCompany = null;
  }

  getCompanies(): void {
    this.companiesService.getCompanies('').then(companies => this.updateCompanies(companies));
  }

  filterCompanies(searchText: string): void {
    let filteredCompanies: Array<Company>;
    if (searchText && searchText.length > 0) {
      filteredCompanies = _.filter(this.companies, s => s.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || (s.code && s.code.toLowerCase().indexOf(searchText.toLowerCase()) > -1));
    } else {
      filteredCompanies = this.companies;
    }
    this.filteredCompanies = _.take(filteredCompanies, 20);
  }

  updateCompanies(companies: Array<Company>): void {
    this.companies = companies;
    this.filterCompanies(this.searchText);
  }

  createCompany(name: string): void {
    const company = this.companiesService.createCompany(true, name);
    this.getCompanies();
  }

  deleteCompany(company: Company): void {
    this.companiesService.deleteCompany(company);
    const index = this.companies.indexOf(company, 0);
    if (index > -1) {
      this.companies.splice(index, 1);
    }
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
  }

}
