/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { store } from '../store';

describe('Header', () => {
  test('renders the logo and navigates to home page when clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const logo = screen.getByAltText('Grand India Logo');
    expect(logo).toBeInTheDocument();

    fireEvent.click(logo);
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });

  test('renders the order link and navigates to order page when clicked', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    const orderLink = screen.getByRole('link', {
      name: /order/i
    });
    expect(orderLink).toBeInTheDocument();
    await user.click(orderLink);
    const orderPage = screen.getByRole('link', {
      name: /order/i
    });
    expect(orderPage).toBeInTheDocument();
  });
  test('renders the logout button and logs out the user when clicked', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
    await fireEvent.click(loginButton);
  });
});
