/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Settings} from "../model/settings";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  readonly SETTINGS_FILE = '/assets/settings.json';

  private settings$: Observable<Settings>;

  constructor(private http: HttpClient) {
  }

  getSettings(): Observable<Settings> {
    if (!this.settings$) {
      this.loadSettingsFromFile();
    }
    return this.settings$;
  }

  private loadSettingsFromFile(): void {
    this.settings$ = this.http.get<Settings>(this.SETTINGS_FILE).pipe(
      shareReplay()
    );
  }

}
