/* eslint-disable no-undef */
// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import Home from './mainHome'; // Assuming this is the file where your component is defined
// import { BrowserRouter } from 'react-router-dom';
// import MenuList from 'pages/menu/MenuList';

//  describe('Home component', () => {
//   test('renders the component properly', () => {
//     render(
//     <BrowserRouter>
//     <Home />
//     </BrowserRouter>
//     );
//     expect(screen.getByText(/What food do we have in our restaurant?/i)).toBeInTheDocument();
//     expect(screen.getByText(/FROM OUR MENU/i)).toBeInTheDocument();
//     expect(screen.getByText(/We always give our customers a feeling of peace of mind and comfort/i)).toBeInTheDocument();
//     expect(screen.getByText(/Sed ut perspiciatis unde omnis iste natus error voluptate accusantium/i)).toBeInTheDocument();
//   });

//   test('renders the input field',()=>{
//     render(
//     <BrowserRouter>
//     <MenuList/>
//     </BrowserRouter>)
//     //  const input = screen.getByPlaceholderText('Search products...');
//     //  expect(input).toBeInTheDocument();
//   })

//   test('opens filter panel when filter button is clicked', () => {
//     render(
//         <BrowserRouter>
//         <Home />
//         </BrowserRouter>
//     );
//     const filterButton = screen.getByLabelText(/filter/i);
//     fireEvent.click(filterButton);

//     expect(screen.getByText(/Filter Panel/i)).toBeInTheDocument();
//   });

//   test('opens modal when "View Details" button is clicked', () => {
//     render(
//         <BrowserRouter>
//         <Home />
//         </BrowserRouter>
//     );
//     const viewDetailsButton = screen.getByText(/View Details/i);
//     fireEvent.click(viewDetailsButton);

//     expect(screen.getByText(/Filter Panel/i)).toBeInTheDocument();
//     // You may need to modify this assertion based on how your modal works
//   });

// Add more tests as needed to cover the functionality of your component
// });

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuList from '../menu/userMenuList';

describe('MenuList component', () => {
  const menus = [
    {
      _id: '1',
      name: 'Menu Item 1',
      price: 10.99,
      mealTypeCategory: 'Breakfast',
      description: 'Lorem ipsum dolor sit amet',
      isAvailable: true,
      images: [{ image: 'https://via.placeholder.com/75x50' }]
    },
    {
      _id: '2',
      name: 'Menu Item 2',
      price: 15.99,
      mealTypeCategory: 'Lunch',
      description: 'Consectetur adipiscing elit',
      isAvailable: false,
      images: []
    }
  ];

  const handleViewDetails = jest.fn();
  const handleAddToCart = jest.fn();
  const handleSearchChange = jest.fn();
  const handleSearchSubmit = jest.fn();
  const handleCloseModal = jest.fn();

  beforeEach(() => {
    render(
      <MenuList
        menus={menus}
        handleViewDetails={handleViewDetails}
        handleAddToCart={handleAddToCart}
        searchTerm=""
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
        handleCloseModal={handleCloseModal}
        showModal={false}
        selectedMenuItem={null}
      />
    );
  });

  test('renders the component properly', () => {
    expect(
      screen.getByPlaceholderText(/search products.../i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Menu Item 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Menu Item 2/i)).toBeInTheDocument();
  });

  test('calls handleAddToCart when Add to Cart button is clicked', () => {
    const addToCartButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addToCartButton);

    expect(handleAddToCart).toHaveBeenCalledTimes(1);
  });

  test('disables Add to Cart button when menu item is not available', () => {
    const disabledButton = screen.getByText(/Sold Out/i);
    expect(disabledButton).toBeInTheDocument();
  });
});
