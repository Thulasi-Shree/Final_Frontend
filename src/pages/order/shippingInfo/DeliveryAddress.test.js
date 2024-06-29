/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react';
import DeliveryAddress from './DeliveryAddress';

describe('Delivery Details', () => {
  test('renders correctly', () => {
    render(<DeliveryAddress />);
    const MainHeading = screen.getByLabelText(/Delivery Address/i);
    expect(MainHeading).toBeInTheDocument();
    const TextElement1 = screen.getByLabelText(/ZIP Code/i);
    expect(TextElement1).toBeInTheDocument();
    const TextElement2 = screen.getByLabelText(/City/i);
    expect(TextElement2).toBeInTheDocument();
    const TextElement3 = screen.getByLabelText(/State/i);
    expect(TextElement3).toBeInTheDocument();
  });

  test('renders the component', () => {
    const { getByLabelText } = render(<DeliveryAddress />);
    const radioInput = getByLabelText(/Use current location/i);
    expect(radioInput).toBeInTheDocument();
    expect(radioInput).not.toBeChecked();
  });

  // test('toggles the current location', () => {
  //   const { getByLabelText } = render(<DeliveryAddress />);
  //   const radioInput = getByLabelText(/Use current location/i);
  //   fireEvent.click(radioInput);
  //   expect(radioInput).toEqual(true);
  //   fireEvent.click(radioInput);
  //   expect(radioInput).toEqual(false);
  // });
});
