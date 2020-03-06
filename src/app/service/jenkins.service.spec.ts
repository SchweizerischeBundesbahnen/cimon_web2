/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */

import {TestBed} from '@angular/core/testing';

import {JenkinsService} from './jenkins.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SettingsService} from './settings.service';

describe('JenkinsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [SettingsService]
  }));

  it('should be created', () => {
    const service: JenkinsService = TestBed.get(JenkinsService);
    expect(service).toBeTruthy();
  });
});
