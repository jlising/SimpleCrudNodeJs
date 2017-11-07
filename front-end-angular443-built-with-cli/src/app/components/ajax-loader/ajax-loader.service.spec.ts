import { TestBed, inject } from '@angular/core/testing';

import { AjaxLoaderService } from './ajax-loader.service';

describe('AjaxLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjaxLoaderService]
    });
  });

  it('should be created', inject([AjaxLoaderService], (service: AjaxLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
