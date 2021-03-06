import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignDetailsComponent } from './designdetails.component';

describe('DesigndetailsComponent', () => {
  let component: DesignDetailsComponent;
  let fixture: ComponentFixture<DesignDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
