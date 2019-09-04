/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Unit-Test für den Import Guard
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 2.0.0
 * @since 23.05.2017, 2017.
 */
import {throwIfAlreadyLoaded} from './module-import-guard';

describe('Module Import Guard', () => {

    it('should throw an error if the parentModule is already loaded', () => {
        // when
        const parentModule = {};
        const moduleName = 'Mocked parentmodule';
        // then
        expect(() => throwIfAlreadyLoaded(parentModule, moduleName))
            .toThrow(new Error(`${moduleName} has already been loaded. Import core modules in the AppModule only.`));
    });

    it('should not throw an error if ther parentModule has not been loaded', (done) => {
        // when
        const parentModule = undefined;
        const moduleName = 'Undefined parentmodule';
        throwIfAlreadyLoaded(parentModule, moduleName);
        // then
        done();
    });
});
