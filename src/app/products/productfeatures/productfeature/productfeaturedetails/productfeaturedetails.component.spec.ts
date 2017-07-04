import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFeatureDetailsComponent } from './productfeaturedetails.component';

describe('ProductFeatureDetailsComponent', () => {
  let component: ProductFeatureDetailsComponent;
  let fixture: ComponentFixture<ProductFeatureDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFeatureDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFeatureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
