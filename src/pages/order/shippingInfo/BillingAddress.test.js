/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import BillingAddress from './BillingAddress';

describe('Billing Address', () => {
  test('renders correctly', () => {
    render(<BillingAddress />);
    const MainHeading = screen.getByRole('heading', {
      name: /Billing Address/i
    });
    expect(MainHeading).toBeInTheDocument();
    const TextElement1 = screen.getByLabelText(/ZIP Code/i);
    expect(TextElement1).toBeInTheDocument();
    const TextElement2 = screen.getByLabelText(/City/i);
    expect(TextElement2).toBeInTheDocument();
    const TextElement3 = screen.getByLabelText(/State/i);
    expect(TextElement3).toBeInTheDocument();
  });
});
