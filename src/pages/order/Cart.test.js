/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like toBeInTheDocument
import { BrowserRouter } from 'react-router-dom';
import Cart from './cart';

const mockLocalStorage = {
  cartItems: JSON.stringify([
    {
      _id: '1',
      name: 'Item 1',
      price: 10.99,
      quantity: 2,
      isAvailable: true
    },
    {
      _id: '2',
      name: 'Item 2',
      price: 15.99,
      quantity: 1,
      isAvailable: true
    }
  ]),
  Address: JSON.stringify('123 Street'),
  selectedDate: JSON.stringify('2024-04-12'),
  branch: JSON.stringify('Branch Name'),
  selectedTimeSlot: JSON.stringify('12:00 PM')
};
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: (key) => mockLocalStorage[key],
      setItem: jest.fn(),
      removeItem: jest.fn()
    },
    writable: true
  });

  render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  );
});

test('renders the component with items', () => {
  expect(screen.getByText('Item 1')).toBeInTheDocument();
  expect(screen.getByText('Item 2')).toBeInTheDocument();
});
test('checks out the cart', () => {
  const checkoutButton = screen.getByText('Check out');
  fireEvent.click(checkoutButton);
  expect(window.localStorage.setItem).toHaveBeenCalledWith(
    'cartItemsTotal',
    JSON.stringify(37.97)
  );
});
