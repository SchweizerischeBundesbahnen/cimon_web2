/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {routing} from './app.routes';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CoreModule} from "./core/core.module";

import {AccordionModule} from 'primeng/accordion';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    AccordionModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    routing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
