import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteByEmailComponent } from './invite-by-email.component';

describe('InviteByEmailComponent', () => {
  let component: InviteByEmailComponent;
  let fixture: ComponentFixture<InviteByEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteByEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
