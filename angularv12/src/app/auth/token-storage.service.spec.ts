import { TestBed, inject } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';

// store token into browser storageService
describe('TokenStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenStorageService]
    });
  });

  it('should be created', inject([TokenStorageService], (service: TokenStorageService) => {
    expect(service).toBeTruthy();
  }));
});
