/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */
import {Component} from '@angular/core';

interface NavItem {
  displayName: string;
  routerLink: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  public navItems: Array<NavItem> = [
    {displayName: 'CIMON Dashboard', routerLink: '/'}
  ];

  public isCollapsed = true;

}
