/* eslint-disable no-undef */
// import {render, screen } from '@testing-library/react';
// import ContactUs from './contactUs';
// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import ContactUs from './contactUs';

// describe('ContactUs', () => {
//   test('renders the contact form and submits the form when clicked', async () => {
//     render(<ContactUs />);

//     const fullNameInput = screen.getByLabelText('Full Name');
//     const emailInput = screen.getByLabelText('Email Address');
//     const subjectInput = screen.getByLabelText('Subject');
//     const messageInput = screen.getByLabelText('Message');
//     const submitButton = screen.getByText('Send');

//     await fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
//     await fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
//     await fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
//     await fireEvent.change(messageInput, { target: { value: 'Test Message' } });

//     await fireEvent.click(submitButton);

//     const successMessage = screen.getByText('Email sent successfully');
//     expect(successMessage).toBeInTheDocument();
//   });

//   test('displays an error message when the form is submitted with invalid data', () => {
//     render(<ContactUs />);

//     const submitButton = screen.getByText('Send');

//     fireEvent.click(submitButton);

//     const errorMessage = screen.getByText('Error sending email');
//     expect(errorMessage).toBeInTheDocument();
//   });
// });

// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import ContactUs from './contactUs';

// test('submitting the form', async () => {
//   const mockedPost = jest.fn().mockResolvedValueOnce({ data: { success: true } });
//   jest.spyOn(axios, 'post').mockImplementation(mockedPost);

//   const { getByLabelText, getByText } = render(<ContactUs />);

//   const fullNameInput = getByLabelText(/Full Name/);
//   const emailInput = getByLabelText(/Email Address/);
//   const subjectInput = getByLabelText(/Subject/);
//   const messageInput = getByLabelText(/Message/);
//   const submitButton = getByText(/Send/);

//   fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
//   fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
//   fireEvent.change(subjectInput, { target: { value: 'Testing' } });
//   fireEvent.change(messageInput, { target: { value: 'This is a test message' } });
//   fireEvent.click(submitButton);

//   expect(mockedPost).toHaveBeenCalledWith('api/send-email', {
//     fullName: 'John Doe',
//     email: 'johndoe@example.com',
//     subject: 'Testing',
//     message: 'This is a test message'
//   });

//   await waitFor(() => {
//     expect(getByText('Email sent successfully')).toBeInTheDocument();
//     expect(fullNameInput).toHaveValue('');
//     expect(emailInput).toHaveValue('');
//     expect(subjectInput).toHaveValue('');
//     expect(messageInput).toHaveValue('');
//   });
// });

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ContactUs from './contactUs';

jest.mock('axios');

describe('ContactUs Component', () => {
  screen.debug();
  test('renders ContactUs component', () => {
    render(<ContactUs />);
    const contactButton = screen.getByRole('button', {
      name: /Contact Us/i
    });
    expect(contactButton).toBeInTheDocument();
  });
  screen.debug();

  test('submits form and sends email successfully', async () => {
    render(<ContactUs />);

    const fullNameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');
    const subjectInput = screen.getByLabelText('Subject');
    const messageInput = screen.getByLabelText('Message');
    const sendButton = screen.getByText('Send');

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, {
      target: { value: 'Test message content' }
    });

    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('api/send-email', {
        fullName: 'John Doe',
        email: 'johndoe@example.com',
        subject: 'Test Subject',
        message: 'Test message content'
      });
      expect(fullNameInput).toHaveValue('John Doe');
      expect(emailInput).toHaveValue('johndoe@example.com');
      expect(subjectInput).toHaveValue('Test Subject');
      expect(messageInput).toHaveValue('Test message content');
    });
  });
});
