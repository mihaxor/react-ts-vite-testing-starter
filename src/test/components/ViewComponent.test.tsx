import {beforeEach, describe, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from '../../App.tsx';

describe('Vitest', () => {
    beforeEach(() => {
        console.log('Before each test');
    });

    test('should run find the component', () => {
        render(<App />);

        const elementValue = screen.getByText(/count is 0/i);

        expect(elementValue).toBeInTheDocument();
    });
});