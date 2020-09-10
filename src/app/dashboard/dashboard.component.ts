/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {JenkinsService} from '../service/jenkins.service';
import {Build} from '../model/build';
import {SelectItem} from 'primeng/api';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  loading = false;
  builds: Build[] = [];
  filteredBuilds: Build[] = [];
  sortOptions: SelectItem[];
  selectedSortOption = 'result';
  form: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(public jenkinsService: JenkinsService,
              private fb: FormBuilder) {
    this.sortOptions = [
      {label: 'Sort by Name', value: 'name'},
      {label: 'Sort by Result and Name', value: 'result'}
    ];
  }

  ngOnInit(): void {
    this.buildForms();
    this.loadBuilds();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private buildForms() {
    this.form = this.fb.group({
      filter: ''
    });
    this.subscriptions.push(this.form.controls.filter.valueChanges.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      debounceTime(500)
    ).subscribe(() => this.applyFilter()));
  }

  loadBuilds() {
    this.loading = true;
    this.jenkinsService.getBuilds().subscribe(builds => {
      builds.forEach((build: Build) => {
        if (build.building) {
          build.result = 'BUILDING';
        } else if (!build.result) {
          build.result = 'UNKNOWN';
        }
      });
      this.builds = builds;
      this.sortBuilds();
      this.applyFilter();
      this.loading = false;
    });
  }

  changeSortOrder(sortType: string): void {
    this.sortBuilds();
    this.applyFilter();
  }

  applyFilter() {
    if (this.form.controls.filter.value && this.form.controls.filter.value.length) {
      this.filteredBuilds = this.builds.filter(
        build => build.fullDisplayName.toLowerCase().includes(this.form.controls.filter.value.toLowerCase())
      );
    } else {
      this.filteredBuilds = this.builds;
    }
  }

  sortBuilds() {
    this.builds.sort((b1, b2) =>
      this.selectedSortOption === 'result' ?
        this.compareByResultAndName(b1, b2) :
        this.compareByName(b1, b2));
  }

  compareByResultAndName(b1: Build, b2: Build) {
    const resultComparison = this.compareByResult(b1, b2);
    const nameComparison = this.compareByName(b1, b2);
    if (resultComparison === 0) {
      return nameComparison;
    }
    return resultComparison;
  }

  compareByName(b1: Build, b2: Build) {
    return b1.fullDisplayName < b2.fullDisplayName ? -1 : b1.fullDisplayName > b2.fullDisplayName ? 1 : 0;
  }

  compareByResult(b1: Build, b2: Build) {
    const orderedResult1 = this.getResultValue(b1);
    const orderedResult2 = this.getResultValue(b2);
    return orderedResult1 < orderedResult2 ? -1 : orderedResult1 > orderedResult2 ? 1 : 0;
  }

  getResultValue(build: Build): string {
    // prepends ordering information for known results; others are ordered alphabetically at the end
    const result = build.building ? 'BUILDING' : build.result ? build.result : 'UNKNOWN';
    let prefix = '9';
    switch (result) {
      case 'BUILDING':
        prefix = '0';
        break;
      case 'FAILURE':
        prefix = '1';
        break;
      case 'UNSTABLE':
        prefix = '2';
        break;
      case 'SUCCESS':
        prefix = '3';
        break;
      case 'ABORTED':
        prefix = '7';
        break;
      case 'UNKNOWN':
        prefix = '8';
        break;
      default:
        prefix = '9';
        break;
    }
    return `${prefix}_${result}`;
  }

  getNumberOfSuccessfulBuilds(): number {
    let successfulCounter = 0;
    for (const build of this.builds) {
      if (build.result === 'SUCCESS') {
        successfulCounter++;
      }
    }
    return successfulCounter;
  }

  getNumberOfBuilds(): number {
    return this.builds.length;
  }

}
