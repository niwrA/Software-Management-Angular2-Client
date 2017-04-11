import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandElementComponent } from './command-element.component';

describe('CommandElementComponent', () => {
  let component: CommandElementComponent;
  let fixture: ComponentFixture<CommandElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
