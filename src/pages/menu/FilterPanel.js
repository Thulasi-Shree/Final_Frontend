
import Loader from 'layout/Loader';
import React from 'react';
import { Button } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import './FilterPanel.css';

const FilterPanel = ({
  dietaryCategories,
  mealCategories,
  mealTypeCategory,
  setMealTypeCategory,
  dietaryPreferenceCategory,
  setDietaryPreferenceCategory,
  handleClearFilter,
  productsCount,
  loading
}) => {
  return (
    <div className='container-fluid' >
      <div className="row">
        <h4 id="products_heading">Category</h4>
        {/* <Button onClick={handleClearFilter}>clear</Button> */}
        {/* <hr /> */}
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div
              style={{
                background: '#red',
                borderRadius: '8px'
              }}
            >
              <div>
                <>
                  <h5 className="mb-3 mt-3" style={{ color: 'black' }}>
                    Food Preferences
                  </h5>
                </>
                <div className="row ms-md-n4">
                  <ul className="grid gap-3">
                    {dietaryCategories.map((category) => (
                      <li
                        style={{
                          cursor: 'pointer',
                          listStyleType: 'none',
                          color:
                            dietaryPreferenceCategory ===
                            category.dietaryPreferenceCategory
                              ? 'red'
                              : 'black' // Highlight color
                        }}
                        key={category._id}
                        onClick={() => {
                          if (
                            dietaryPreferenceCategory ===
                            category.dietaryPreferenceCategory
                          ) {
                            setDietaryPreferenceCategory(null);
                          } else {
                            setDietaryPreferenceCategory(
                              category.dietaryPreferenceCategory
                            );
                          }
                        }}
                      >
                        {category.dietaryPreferenceCategory}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* <hr /> */}
              <div className=" mt-5">
                <>
                  <h5 className="mb-3" style={{ color: 'black' }}>
                    Course
                  </h5>
                </>
                <div className=" row ms-md-n4">
                  <ul className="grid gap-3">
                    {mealCategories.map((category) => (
                      <li
                        style={{
                          cursor: 'pointer',
                          listStyleType: 'none',
                          color:
                            mealTypeCategory === category.mealTypeCategory
                              ? 'red'
                              : 'black'
                        }}
                        key={category._id}
                        onClick={() => {
                          if (mealTypeCategory === category.mealTypeCategory) {
                            setMealTypeCategory(null);
                          } else {
                            setMealTypeCategory(category.mealTypeCategory);
                          }
                        }}
                      >
                        {category.mealTypeCategory}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
