/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {routing} from './app.routes';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CoreModule} from './core/core.module';
import {DurationPipe} from './pipe/duration.pipe';

import {AccordionModule} from 'primeng/accordion';
import {FormsModule} from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [AppComponent, DashboardComponent, DurationPipe],
  imports: [
    AccordionModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CoreModule,
    FormsModule,
    ProgressSpinnerModule,
    SelectButtonModule,
    routing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
