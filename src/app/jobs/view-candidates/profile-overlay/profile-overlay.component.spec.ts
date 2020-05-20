import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOverlayComponent } from './profile-overlay.component';

describe('ProfileOverlayComponent', () => {
  let component: ProfileOverlayComponent;
  let fixture: ComponentFixture<ProfileOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
