import { TestBed } from '@angular/core/testing';

import { ProfileOverlayService } from './profile-overlay.service';

describe('ProfileOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileOverlayService = TestBed.get(ProfileOverlayService);
    expect(service).toBeTruthy();
  });
});
