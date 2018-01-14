import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInstallationsComponent } from './product-installations.component';

describe('ProductInstallationsComponent', () => {
  let component: ProductInstallationsComponent;
  let fixture: ComponentFixture<ProductInstallationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInstallationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInstallationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
