/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */

import {TestBed} from '@angular/core/testing';

import {JobsService} from './jobs.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('JobsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: JobsService = TestBed.get(JobsService);
    expect(service).toBeTruthy();
  });
});
