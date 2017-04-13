import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandElementDetailsComponent } from './command-element-details.component';

describe('CommandElementDetailsComponent', () => {
  let component: CommandElementDetailsComponent;
  let fixture: ComponentFixture<CommandElementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandElementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandElementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
