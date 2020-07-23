/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */

import {Component, OnInit} from '@angular/core';
import {JenkinsService} from '../service/jenkins.service';
import {Build} from '../model/build';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading = false;
  builds: Build[] = [];
  sortOptions: SelectItem[];
  selectedSortOption = 'result';

  constructor(public jenkinsService: JenkinsService) {
    this.sortOptions = [
      {label: 'Sort by Name', value: 'name'},
      {label: 'Sort by Result and Name', value: 'result'}
    ];
  }

  ngOnInit(): void {
    this.loadBuilds();
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
      this.loading = false;
    });
  }

  changeSortOrder(sortType: string): void {
    this.sortBuilds();
  }

  sortBuilds() {
    this.builds = this.builds.sort((b1, b2) => this.selectedSortOption === 'result' ? this.compareByResultAndName(b1, b2) : this.compareByName(b1, b2));
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
