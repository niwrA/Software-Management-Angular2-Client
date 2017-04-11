import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandElementsComponent } from './command-elements.component';

describe('CommandElementsComponent', () => {
  let component: CommandElementsComponent;
  let fixture: ComponentFixture<CommandElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
