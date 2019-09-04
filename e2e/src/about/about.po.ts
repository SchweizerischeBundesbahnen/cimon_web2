/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Page Object für die About Seite
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 2.0.0
 * @since 30.04.2017, 2017.
 */
import {by, element} from 'protractor';

export class AboutPo {

    private changeToGermanButton;
    private changeToEnglishButton;
    private aboutTitle;
    private aboutSubtitle;

    constructor() {
        this.changeToGermanButton = element(by.id('change-to-german-button'));
        this.changeToEnglishButton = element(by.id('change-to-english-button'));
        this.aboutTitle = element(by.id('about-title'));
        this.aboutSubtitle = element(by.id('about-subtitle'));
    }

    changeToGerman() {
        this.changeToGermanButton.click();
    }

    changeToEnglish() {
        this.changeToEnglishButton.click();
    }

    getAboutTitleText() {
        return this.aboutTitle.getText();
    }

    getAboutSubtitleText() {
        return this.aboutSubtitle.getText();
    }
}
