import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicElementComponent } from './epic-element.component';

describe('EpicElementComponent', () => {
  let component: EpicElementComponent;
  let fixture: ComponentFixture<EpicElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpicElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
