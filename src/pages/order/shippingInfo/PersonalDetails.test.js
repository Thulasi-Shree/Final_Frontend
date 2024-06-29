/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react';
import PersonalDetails from './PersonalDetails';

describe('Personal Details', () => {
  it('renders correctly', () => {
    render(<PersonalDetails />);
    const MainHeading = screen.getByRole('heading', {
      name: /Personal details/i
    });
    expect(MainHeading).toBeInTheDocument();
    const TextElement1 = screen.getByText(/first name/i);
    expect(TextElement1).toBeInTheDocument();
    const TextElement2 = screen.getByText(/last name/i);
    expect(TextElement2).toBeInTheDocument();
    const buttonElement = screen.getByRole('button', {
      name: /get otp/i
    });
    fireEvent.click(buttonElement);
    expect(buttonElement).toBeInTheDocument();
  });
  it('renders input field', () => {
    render(<PersonalDetails />);
    const inputElement = screen.getByPlaceholderText(/First Name is Required/i);
    fireEvent.change(inputElement, { target: { value: 'Shyas' } });
    expect(inputElement.value).toBe('Shyas');
    const inputElement1 = screen.getByPlaceholderText(/Last Name is Required/i);
    fireEvent.change(inputElement1, { target: { value: 'S' } });
    expect(inputElement1.value).toBe('S');
  });
});
