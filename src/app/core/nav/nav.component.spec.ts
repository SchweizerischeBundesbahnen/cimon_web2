/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {NavComponent} from './nav.component';

describe('NavbarComponent', () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterModule.forRoot([], {useHash: true})],
            declarations: [NavComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should declare navItems for dashboard', () => {
        const expectedNavItems = [
            {displayName: 'CIMON Dashboard', routerLink: '/'}
        ];
        expect(expectedNavItems).toEqual(component.navItems);
    });

});
