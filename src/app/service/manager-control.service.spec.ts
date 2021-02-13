import { TestBed } from '@angular/core/testing';

import { ManagerControlService } from './manager-control.service';

describe('ManagerControlService', () => {
  let service: ManagerControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
