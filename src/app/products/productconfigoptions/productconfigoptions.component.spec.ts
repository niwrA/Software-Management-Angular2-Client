import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductconfigoptionsComponent } from './productconfigoptions.component';

describe('ProductconfigoptionsComponent', () => {
  let component: ProductconfigoptionsComponent;
  let fixture: ComponentFixture<ProductconfigoptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductconfigoptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductconfigoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
