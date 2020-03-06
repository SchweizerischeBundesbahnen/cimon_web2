/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */

import {TestBed} from '@angular/core/testing';

import {SettingsService} from './settings.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: SettingsService = TestBed.get(SettingsService);
    expect(service).toBeTruthy();
  });
});
