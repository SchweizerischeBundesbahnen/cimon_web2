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
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  builds: Build[] = [];
  sortOptions: SelectItem[];
  sortByResult = true;

  constructor(private jenkinsService: JenkinsService) {
    this.sortOptions = [
      {label: 'Sort by Name', value: false},
      {label: 'Sort by Result and Name', value: true}
    ];
  }

  ngOnInit(): void {
    this.builds = this.jenkinsService.getBuilds();
    this.sortBuilds();
  }

  sortOrderChanged(sortByResult: boolean): void {
    if (sortByResult !== this.sortByResult) {
      this.sortByResult = sortByResult;
      console.log('sortByResult', this.sortByResult);
      this.sortBuilds();
    }
  }

  sortBuilds() {
    this.builds = this.builds.sort((b1, b2) => this.sortByResult ? this.compareByResultAndName(b1, b2) : this.compareByName(b1, b2));
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
}
