import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteLocalComponent } from './invite-local.component';

describe('InviteLocalComponent', () => {
  let component: InviteLocalComponent;
  let fixture: ComponentFixture<InviteLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
