import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductconfigoptiondetailsComponent } from './productconfigoptiondetails.component';

describe('ProductconfigoptiondetailsComponent', () => {
  let component: ProductconfigoptiondetailsComponent;
  let fixture: ComponentFixture<ProductconfigoptiondetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductconfigoptiondetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductconfigoptiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
