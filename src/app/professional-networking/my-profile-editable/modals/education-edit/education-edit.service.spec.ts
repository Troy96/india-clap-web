import { TestBed } from '@angular/core/testing';

import { EducationEditService } from './education-edit.service';

describe('EducationEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EducationEditService = TestBed.get(EducationEditService);
    expect(service).toBeTruthy();
  });
});
