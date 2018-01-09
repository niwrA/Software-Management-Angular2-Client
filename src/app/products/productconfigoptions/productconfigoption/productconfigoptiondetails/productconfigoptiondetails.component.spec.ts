import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfigOptionDetailsComponent } from './productconfigoptiondetails.component';

describe('ProductConfigOptionDetailsComponent', () => {
  let component: ProductConfigOptionDetailsComponent;
  let fixture: ComponentFixture<ProductConfigOptionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductConfigOptionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfigOptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
