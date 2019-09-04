/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: E2E Test für die Aboutseite
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 2.0.0
 * @since 30.04.2017, 2017.
 */
import {AboutPo} from './about.po';
import {browser} from 'protractor';

describe('AboutPage', function () {
    let aboutPage: AboutPo;

    beforeEach(() => {
        aboutPage = new AboutPo();
        browser.get('#/about');
    });

    it('should change the language from german to english and back to german', () => {
        // when
        aboutPage.changeToEnglish();
        // then
        expect(aboutPage.getAboutTitleText()).toBe('The about page');
        expect(aboutPage.getAboutSubtitleText()).toBe('This text gets translated by ng2-translate');
        // when
        aboutPage.changeToGerman();
        // then
        expect(aboutPage.getAboutTitleText()).toBe('Die About Seite');
        expect(aboutPage.getAboutSubtitleText()).toBe('Dieser Text wird von ng2-translate übersetzt');
    });
});
