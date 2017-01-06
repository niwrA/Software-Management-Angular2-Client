import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Company } from '../company';
import { CompaniesService } from '../companies.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  company: Company;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CompaniesService
  ){}

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.service.getCompany(params['companyId']))
    .subscribe((company: Company) => this.company = company);
  }

}
