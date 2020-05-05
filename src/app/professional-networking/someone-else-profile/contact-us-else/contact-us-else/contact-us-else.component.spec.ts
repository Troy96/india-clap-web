import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsElseComponent } from './contact-us-else.component';

describe('ContactUsElseComponent', () => {
  let component: ContactUsElseComponent;
  let fixture: ComponentFixture<ContactUsElseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsElseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsElseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
