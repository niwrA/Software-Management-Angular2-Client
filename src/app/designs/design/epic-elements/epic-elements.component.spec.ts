import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicElementsComponent } from './epic-elements.component';

describe('EpicElementsComponent', () => {
  let component: EpicElementsComponent;
  let fixture: ComponentFixture<EpicElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpicElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
