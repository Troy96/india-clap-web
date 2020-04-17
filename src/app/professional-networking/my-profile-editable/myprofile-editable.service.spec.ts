import { TestBed } from '@angular/core/testing';

import { MyprofileEditableService } from './myprofile-editable.service';

describe('MyprofileEditableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyprofileEditableService = TestBed.get(MyprofileEditableService);
    expect(service).toBeTruthy();
  });
});
