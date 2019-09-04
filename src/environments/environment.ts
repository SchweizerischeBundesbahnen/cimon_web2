/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * The file contents for the current environment will overwrite these during build.
 * The build system defaults to the dev environment which uses `environment.ts`, but if you do
 * `ng build --env=prod` then `environment.prod.ts` will be used instead.
 * The list of which env maps to which file can be found in `angular.json`.
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 5.1.0
 * @since 05.01.2018, 2018.
 */

import {KeycloakInitOptions} from 'keycloak-js';
import {KeycloakConfig} from 'esta-webjs-extensions';
import {Environment} from './environment.model';

const authOptions: KeycloakInitOptions = {flow: 'implicit'};
const authConfig: KeycloakConfig = {
  realm: 'YOUR_REALM',
  url: 'https://YOUR_SERVER.com',
  clientId: 'YOUR_CLIENT_ID'
};

export const environment: Environment = {
  production: false,
  authConfig,
  authOptions
};

