/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('Footer-Testing', () => {
  render(<Footer />);
  const firstElement = screen.getByRole('heading', {
    name: 'WE ARE HERE'
  });
  expect(firstElement).toBeInTheDocument();
  const SecondElement = screen.getByText('82 Place Charles de Gaulle, Paris');
  expect(SecondElement).toBeInTheDocument();

  const thirdElement = screen.getByText('+91 801-555-99-43');
  expect(thirdElement).toBeInTheDocument();

  const fourthElement = screen.getByText(
    /a distinctive, well\-preserved and comfortable space, high\-quality products, authentic cuisine, food and drinks are done flawlessly\./i
  );
  expect(fourthElement).toBeInTheDocument();
});
