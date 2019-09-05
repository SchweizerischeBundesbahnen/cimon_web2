/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */

import {Culprit} from './culprit';

export interface Build {
  building: boolean;
  description: string;
  displayName: string;
  duration: number;
  estimatedDuration: number;
  fullDisplayName: string;
  id: string;
  kepLog: boolean;
  number: number;
  queueId: number;
  result: string;
  timestamp: number;
  url: string;
  builtOn: string;
  culprits: Culprit[];
  actions: any[];
}
