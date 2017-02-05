/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductsComponent } from './products.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductsService } from './products.service';
import { ProductsServiceStub } from './mock-products';
import { NotificationsService } from 'angular2-notifications';
import { NotificationsServiceStub } from '../external/mock-external';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [{provider: ProductsService, useClass: ProductsServiceStub},
      {provider: NotificationsService, useClass: NotificationsServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
