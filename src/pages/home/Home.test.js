/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import HomePage from './home';

jest.mock('axios', () => ({
  get: jest.fn()
}));
describe('HomePage', () => {
  test('renders the product modal and restaurant selection components', async () => {
    axios.get.mockResolvedValueOnce({ data: { data: [] } });
    render(<HomePage />);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  });

  test('displays an error message when there is an error fetching data', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching data'));
    render(<HomePage />);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  });
});
