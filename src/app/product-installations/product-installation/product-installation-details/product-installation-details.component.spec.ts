import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInstallationDetailsComponent } from './product-installation-details.component';

describe('ProductInstallationDetailsComponent', () => {
  let component: ProductInstallationDetailsComponent;
  let fixture: ComponentFixture<ProductInstallationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInstallationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInstallationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
