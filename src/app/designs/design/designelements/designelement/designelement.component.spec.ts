import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignelementComponent } from './designelement.component';

describe('DesignelementComponent', () => {
  let component: DesignelementComponent;
  let fixture: ComponentFixture<DesignelementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignelementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
