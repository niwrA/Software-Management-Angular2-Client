import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsSelectComponent } from './contacts-select.component';

describe('ContactsSelectComponent', () => {
  let component: ContactsSelectComponent;
  let fixture: ComponentFixture<ContactsSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
