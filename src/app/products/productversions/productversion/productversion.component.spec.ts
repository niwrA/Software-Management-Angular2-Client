/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductVersionComponent } from './productversion.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductVersionComponent', () => {
  let component: ProductVersionComponent;
  let fixture: ComponentFixture<ProductVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductVersionComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // todo: make tests when this component becomes used and connected to backend
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
