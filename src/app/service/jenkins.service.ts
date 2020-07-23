/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */

import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SettingsService} from './settings.service';
import {JobsService} from './jobs.service';
import {Settings} from '../model/settings';
import {Build} from '../model/build';

@Injectable({
  providedIn: 'root'
})
export class JenkinsService {

  settings: Settings;
  jobs: string[] = [];
  loading: boolean;

  constructor(private http: HttpClient,
              private settingsService: SettingsService,
              private jobsService: JobsService) {
  }

  /** GET: get builds by name from Jenkins */
  getBuilds(): Build[] {
    this.loading = true;
    const builds = [];
    let counter = 0;

    this.loadSettingsAndJobs().subscribe(() => {
      this.jobs.map((job: string) => {
        const url = this.getUrl(job);
        this.getBuild(url).subscribe(data => {
          builds.push(data);
          counter++;
          if (this.jobs.length === counter) {
            this.loading = false;
          }
        }, (error: HttpErrorResponse) => {
          // TODO what do we do with builds which do not exist anymore?
          if (error.status === 404) {
            console.log('Build not found for job: ' + job);
          }
          counter++;
          if (this.jobs.length === counter) {
            this.loading = false;
          }
        });
      });
    });

    return builds;
  }

  private getUrl(job: string): string {
    return '/ci/job/' + job + '/lastBuild/api/json';
  }

  private getBuild(url: string): Observable<Build> {
    return this.http.get<Build>(url).pipe(
      catchError(JenkinsService.handleError)
    );
  }

  private loadSettingsAndJobs(): Observable<void> {
    // Daten holen und wenn vorhanden, diese setzen
    return forkJoin([
      this.settingsService.getSettings(),
      this.jobsService.getJobs()
    ]).pipe(map((result: any[]) => {
      const [settings, jobs] = result;
      this.settings = settings;
      this.jobs = jobs;
    }));
  }

  /**
   * Handle Http operation that failed. Throw the error to let the component handle it.
   * @param error the Http error response
   */
  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred calling Jenkins REST endpoint: ' + error.error.message);
    } else {
      // the backend returned an unsuccessful response code.
      // the response body may contain clues about what went wrong
      console.error(`Calling REST endpoint returned code ${error.status}, body was: ${error.error}.`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
}
