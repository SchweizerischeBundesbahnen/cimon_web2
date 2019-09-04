/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS 2: Model for environments
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 5.1.0
 * @since 05.01.2018, 2018.
 */
import {KeycloakInitOptions} from 'keycloak-js';
import {KeycloakConfig} from 'esta-webjs-extensions';

export interface Environment {
    production: boolean;
    authConfig: KeycloakConfig;
    authOptions: KeycloakInitOptions;
}
