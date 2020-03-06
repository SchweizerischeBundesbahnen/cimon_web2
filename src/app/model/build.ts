/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */

import {Culprit} from './culprit';

export interface Build {
  building: boolean;
  description: string;
  duration: number;
  fullDisplayName: string;
  number: number;
  result: string;
  timestamp: number;
  url: string;
  builtOn: string;
  culprits: Culprit[];
  actions: any[];
}
