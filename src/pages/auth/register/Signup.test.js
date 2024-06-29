/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUpForm from './Signup';

describe('SignUp', () => {
  test('renders correctly', () => {
    render(
      <BrowserRouter>
        <SignUpForm />
      </BrowserRouter>
    );
    const textElement = screen.getByRole('heading', {
      name: 'Sign up'
    });
    const button = screen.getByRole('button', {
      name: 'Sign up'
    });
    fireEvent.change(screen.getByPlaceholderText('FirstName is required'), {
      target: { value: 'test' }
    });
    fireEvent.change(screen.getByPlaceholderText('LastName is required'), {
      target: { value: 'user' }
    });
    fireEvent.change(screen.getByPlaceholderText('Email is required'), {
      target: { value: 'testuser@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password is required'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Phone number is required'), {
      target: { value: '1213214222' }
    });
    fireEvent.click(button);
  });
});
