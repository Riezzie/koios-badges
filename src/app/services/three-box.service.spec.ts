import { TestBed } from '@angular/core/testing';

import { ThreeBoxService } from './three-box.service';

describe('ThreeBoxService', () => {
  let service: ThreeBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreeBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
