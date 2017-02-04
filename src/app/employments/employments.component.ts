import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies/companies.service';
import { EmploymentsService } from './employments.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-employments',
  templateUrl: './employments.component.html',
  styleUrls: ['./employments.component.css']
})
export class EmploymentsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EmploymentsService
  ) { }

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getEmployments(params['companyRoleId'], params['contactId']))
      .subscribe(employments => this.updateEmployments(employments));
  }
  updateEmployments(employments) {

  }
}
