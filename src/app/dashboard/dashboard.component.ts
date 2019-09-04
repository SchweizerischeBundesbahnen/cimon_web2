/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */

import {Component, OnInit} from '@angular/core';
import {JenkinsService} from '../service/jenkins.service';
import {Build} from '../model/build';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  builds: Build[] = [];

  constructor(private jenkinsService: JenkinsService) {
  }

  ngOnInit(): void {
    this.builds = this.jenkinsService.getBuilds();
  }

  getBuildColor(build: Build): string {
    switch (build.result) {
      case 'SUCCESS':
        return 'green';
      case 'FAILURE':
        return 'red';
      default:
        return 'blue';
    }
  }

}
