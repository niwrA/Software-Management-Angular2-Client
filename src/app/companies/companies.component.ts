import { Component, OnInit } from '@angular/core';
import { CompaniesService } from './companies.service';
import { Company } from './company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers: [CompaniesService]
})

export class CompaniesComponent implements OnInit {
  companies = new Array<Company>();
  selectedCompany: Company;
  searchText: string;

  constructor(private companiesService: CompaniesService) { }

  ngOnInit() {
    this.getCompanies('');
  }

  onSelect(company: Company): void {
    this.selectedCompany = company;
  }

  clearSelection(): void {
    this.selectedCompany = null;
  }

  CompanyDetail(event, Company: Company): void {
/*    event.stopPropagation();
    this.router.navigate(['/Company', Company.Guid]);
*/  }

  getCompanies(searchText: string): void {
    this.companiesService.getCompanies(searchText).then(companies => this.companies = companies);
  }

  createCompany(name: string): void {
    let company = this.companiesService.createCompany();
    company.Name = name;
    this.searchText = '';
    this.getCompanies('');
  }
}

