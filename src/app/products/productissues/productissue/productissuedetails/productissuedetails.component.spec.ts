import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIssueDetailsComponent } from './productissuedetails.component';

describe('ProductIssueDetailsComponent', () => {
  let component: ProductIssueDetailsComponent;
  let fixture: ComponentFixture<ProductIssueDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductIssueDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIssueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
