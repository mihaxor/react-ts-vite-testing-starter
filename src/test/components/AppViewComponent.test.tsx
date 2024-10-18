import {beforeEach, describe, test} from 'vitest';
import {fireEvent, logRoles, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App.tsx';

describe('Vitest', () => {
    let globalContainer = {} as HTMLElement;

    beforeEach(() => {
        const {container} = render(<App />);

        globalContainer = container;
    });

    test('should run find the component', () => {

        logRoles(globalContainer);

        const element = screen.getByText(/count is 0/i);
        const element2 = screen.getByRole('heading', {name: /vite \+ react/i});

        expect(element).toBeInTheDocument();
        expect(element2).toBeInTheDocument();
        expect(element2).not.toHaveTextContent('count is 0');
    });

    test('should test the button color and click event action', () => {
        const button = screen.getByRole('button', {name: /change to blue/i});

        expect(button).toHaveTextContent('Change to blue');
        expect(button).toHaveStyle({'background-color': 'rgb(255, 0, 0)'});

        fireEvent.click(button);

        expect(button).toHaveTextContent('Change to red');
        expect(button).toHaveStyle({'background-color': 'rgb(0, 0, 255)'});
    });

    test('should test the button state', () => {
        const button = screen.getByRole('button', {name: /Just click to win something/i});
        const checkbox = screen.getByTestId('checkboxState');

        expect(button).toBeEnabled();
        expect(checkbox).not.toBeChecked();

        fireEvent.click(checkbox);

        expect(button).toBeDisabled();
        expect(checkbox).toBeChecked();
    });

    test('should test the button state with userEvent', async () => {
        const button = screen.getByRole('button', {name: /Just click to win something/i});
        const checkbox = screen.getByTestId('checkboxState');

        expect(button).toBeEnabled();
        expect(checkbox).not.toBeChecked();

        await userEvent.click(checkbox);

        expect(button).toBeDisabled();
        expect(checkbox).toBeChecked();
    });

    test('should test the button state with userEvent and Promise', () => {
        const user = userEvent.setup();

        const button = screen.getByRole('button', {name: /Just click to win something/i});
        const checkbox = screen.getByTestId('checkboxState');

        expect(button).toBeEnabled();
        expect(checkbox).not.toBeChecked();

        user.click(checkbox)
            .then(() => {
                expect(button).toBeDisabled();
                expect(checkbox).toBeChecked();
            });
    });

    test('should check the element if it is in the DOM', async () => {
        const nullButton = screen.queryByRole('button', {name: /testing/i});

        expect(nullButton).not.toBeInTheDocument();
    });
});