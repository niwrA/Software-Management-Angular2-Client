/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UsersService } from '../users/users.service';

import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RouterStub, ActivatedRouteStub } from 'testing/router-stubs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let activeRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ LoginComponent ],
      providers: [UsersService, { provide: ActivatedRoute, useClass: ActivatedRouteStub }, {provide: Router, useClass: RouterStub} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
