/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  private SECONDS_IN_MINUTE = 60;
  private SECONDS_IN_HOUR = 60 * this.SECONDS_IN_MINUTE;
  private SECONDS_IN_DAY = 24 * this.SECONDS_IN_HOUR;

  private showMilliseconds = false;

  transform(milliseconds: number): string {
    let seconds = Math.floor(milliseconds / 1000);
    milliseconds = milliseconds - (1000 * seconds);

    const days = Math.floor(seconds / this.SECONDS_IN_DAY);
    seconds -= days * this.SECONDS_IN_DAY;

    const hours = Math.floor(seconds / this.SECONDS_IN_HOUR);
    seconds -= hours * this.SECONDS_IN_HOUR;

    const minutes = Math.floor(seconds / this.SECONDS_IN_MINUTE);
    seconds -= minutes * this.SECONDS_IN_MINUTE;

    let result = '';
    if (days > 0) {
      result = `${days}d `;
    }

    if (hours > 0 || result.length) {
      result = `${result}${hours}h `;
    }

    if (minutes > 0 || result.length) {
      result = `${result}${minutes}m `;
    }

    if (seconds > 0 || result.length) {
      if (this.showMilliseconds && milliseconds > 0) {
        result = `${result}${seconds}.${milliseconds}s`;
      } else {
        result = `${result}${seconds}s`;
      }
    }

    return result;
  }
}
