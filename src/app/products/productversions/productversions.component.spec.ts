/* tslint:disable:no-unused-variable */
import { fakeAsync, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivatedRouteStub } from 'testing/router-stubs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductVersionsComponent } from './productversions.component';
import { ProductsService } from '../products.service';
import { ProductsServiceStub } from '../mock-products';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';

describe('ProductVersionsComponent', () => {
  let component: ProductVersionsComponent;
  let fixture: ComponentFixture<ProductVersionsComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'products/:productId', component: ProductVersionsComponent }])],
      declarations: [ProductVersionsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ProductsService, useClass: ProductsServiceStub }, {provide: ActivatedRoute, useClass: ActivatedRouteStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVersionsComponent);
    component = fixture.componentInstance;
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.testParams = { productId: 'product11'};
    fixture.detectChanges();
  });

// todo: make tests when this component becomes used and connected to backend
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
