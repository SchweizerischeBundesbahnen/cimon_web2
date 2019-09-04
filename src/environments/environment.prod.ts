/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS 2: Environment for production
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 5.1.0
 * @since 05.01.2018, 2018.
 */
import {KeycloakInitOptions} from 'keycloak-js';
import {KeycloakConfig} from 'esta-webjs-extensions';
import {Environment} from './environment.model';

const authOptions: KeycloakInitOptions = {onLoad: 'check-sso', flow: 'implicit'};
const authConfig: KeycloakConfig = {
  realm: 'YOUR_REALM',
  url: 'https://YOUR_SERVER.com',
  clientId: 'YOUR_CLIENT_ID'
};

export const environment: Environment = {
  production: true,
  authConfig,
  authOptions
};
