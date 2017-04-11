import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicElementDetailsComponent } from './epic-element-details.component';

describe('EpicElementDetailsComponent', () => {
  let component: EpicElementDetailsComponent;
  let fixture: ComponentFixture<EpicElementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpicElementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicElementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
