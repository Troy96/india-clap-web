import { TestBed } from '@angular/core/testing';

import { ContactUsElseService } from './contact-us-else.service';

describe('ContactUsElseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactUsElseService = TestBed.get(ContactUsElseService);
    expect(service).toBeTruthy();
  });
});
