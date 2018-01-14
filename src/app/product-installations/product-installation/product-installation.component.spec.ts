import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInstallationComponent } from './product-installation.component';

describe('ProductInstallationComponent', () => {
  let component: ProductInstallationComponent;
  let fixture: ComponentFixture<ProductInstallationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInstallationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
