/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {shareReplay} from "rxjs/operators";
import {Job} from "../model/job";

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  readonly JOBS_FILE = '/assets/jobs.json';

  private jobs$: Observable<Job[]>;

  constructor(private http: HttpClient) {
  }

  getJobs(): Observable<Job[]> {
    if (!this.jobs$) {
      this.loadJobsFromFile();
    }
    return this.jobs$;
  }

  private loadJobsFromFile(): void {
    this.jobs$ = this.http.get<Job[]>(this.JOBS_FILE).pipe(
      shareReplay()
    );
  }

}
