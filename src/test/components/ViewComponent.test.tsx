import {beforeEach, describe, test} from 'vitest';

describe('Vitest', () => {
    beforeEach(() => {
        console.log('Before each test');
    });

    test('should run tests', () => {
        console.log('Running test');
    });
});