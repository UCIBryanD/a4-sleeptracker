import { TestBed } from '@angular/core/testing';

import { ServiceSleepHistoryService } from './service-sleep-history.service';

describe('ServiceSleepHistoryService', () => {
  let service: ServiceSleepHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSleepHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
