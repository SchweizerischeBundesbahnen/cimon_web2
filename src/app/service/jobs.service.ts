/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */

import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError, map, shareReplay} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  //readonly JOBS_URL = environment.jobsUrl;
  readonly JOBS_URL = "/jobs";
  readonly JOBS_FILE = '/assets/jobs.json';

  private jobs$: Observable<string[]>;

  constructor(private http: HttpClient) {
  }

  getJobs(): Observable<string[]> {
    if (!this.jobs$) {
      this.jobs$ = this.fetchJobs();
      // this.loadJobsFromFile();
    }
    return this.jobs$;
  }

  private fetchJobs(): Observable<string[]> {
    console.log('Fetching jobs from', this.JOBS_URL);
    return this.http.get<string[]>(this.JOBS_URL).pipe(
      map(result => {
        console.log('job list loaded', result);
        return result;
      }),
      catchError(JobsService.handleError)
    );
  }

  private loadJobsFromFile(): void {
    this.jobs$ = this.http.get<string[]>(this.JOBS_URL).pipe(
      shareReplay()
    );
  }

  /**
   * Handle Http operation that failed. Throw the error to let the component handle it.
   * @param error the Http error response
   */
  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // a client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred calling REST endpoint: ' + error.error.message);
    } else {
      // the backend returned an unsuccessful response code.
      // the response body may contain clues as to what went wrong,
      console.error(`REST call returned code ${error.status}, body was: ${error.error}.`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

}
