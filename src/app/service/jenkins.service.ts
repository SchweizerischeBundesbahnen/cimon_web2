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
import {Job} from '../model/job';
import {Build} from '../model/build';

@Injectable({
  providedIn: 'root'
})
export class JenkinsService {

  settings: Settings;
  jobs: Job[] = [];

  constructor(private http: HttpClient,
              private settingsService: SettingsService,
              private jobsService: JobsService) {
  }

  loadSettingsAndJobs(): Observable<void> {
    // Daten holen und wenn vorhanden, diese setzen
    return forkJoin(
      this.settingsService.getSettings(),
      this.jobsService.getJobs()
    ).pipe(map((result: any[]) => {
      const [settings, jobs] = result;
      this.settings = settings;
      this.jobs = jobs;
    }));
  }

  /** GET: get builds by name from Jenkins */
  getBuilds(): Build[] {
    // TODO: this is not clean, 'return builds;' below returns immediately, before all builds are loaded
    // TODO: it would be cleaner to return an Observable<Builds[]> to which our callers could subscribe
    const builds = [];

    this.loadSettingsAndJobs().subscribe(() => {
      this.jobs.map(job => {
        const url = this.getUrl(job);
        this.getBuild(url).subscribe(data => {
          builds.push(data);
        });
      });
    });

    return builds;
  }

  private getUrl(job: Job): string {
    return this.settings.jenkinsUrl + '/job/' + job.name + '/lastBuild/api/json';
  }

  private getBuild(url: string): Observable<Build> {
    return this.http.get<Build>(url).pipe(
      catchError(JenkinsService.handleError)
    );
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
      // the response body may contain clues as to what went wrong,
      console.error(`Calling REST endpoint returned code ${error.status}, body was: ${error.error}.`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
}
