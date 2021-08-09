import { TestBed } from '@angular/core/testing';

import { NativeDataService } from './native-data.service';

describe('NativeDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NativeDataService = TestBed.get(NativeDataService);
    expect(service).toBeTruthy();
  });
});
