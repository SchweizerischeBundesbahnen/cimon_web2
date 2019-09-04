/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

export const appRoutes: Routes = [
    {path: '**', component: DashboardComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
