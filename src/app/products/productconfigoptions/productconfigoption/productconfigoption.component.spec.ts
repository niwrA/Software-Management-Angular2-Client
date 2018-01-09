import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductconfigoptionComponent } from './productconfigoption.component';

describe('ProductconfigoptionComponent', () => {
  let component: ProductconfigoptionComponent;
  let fixture: ComponentFixture<ProductconfigoptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductconfigoptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductconfigoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
