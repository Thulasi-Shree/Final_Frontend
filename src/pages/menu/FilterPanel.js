import React from 'react';
import Loader from 'layout/Loader';
import { Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa'; // Importing the FaTimes icon
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
    <div className="container-fluid">
      <div className="row">
        <h4 id="products_heading">Category</h4>
        <button variant="link" onClick={handleClearFilter} className="clear-button1 text-danger">
          <FaTimes /> Clear
        </button>
        {/* <hr /> */}
        {loading ? (
          <Loader />
        ) : (
          <div className="filter-section">
            <div className="food-preferences">
              <h5 className="mb-3 mt-3">Food Preferences</h5>
              <ol className="grid gap-3" style={{ listStyleType: 'disc' }}>
                {dietaryCategories.map(category => (
                  <li
                    key={category._id}
                    className="filter-item"
                    style={{
                      color:
                        dietaryPreferenceCategory ===
                        category.dietaryPreferenceCategory
                          ? 'red'
                          : 'black',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setDietaryPreferenceCategory(
                        dietaryPreferenceCategory ===
                        category.dietaryPreferenceCategory
                          ? null
                          : category.dietaryPreferenceCategory
                      );
                    }}
                  >
                    {category.dietaryPreferenceCategory}
                  </li>
                ))}
              </ol>
            </div>
            {/* <hr /> */}
            <div className="course mt-5">
              <h5 className="mb-3">Course</h5>
              <ol className="grid gap-3" style={{ listStyleType: 'disc' }}>
                {mealCategories.map(category => (
                  <li
                    key={category._id}
                    className="filter-item"
                    style={{
                      color:
                        mealTypeCategory === category.mealTypeCategory
                          ? 'red'
                          : 'black',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setMealTypeCategory(
                        mealTypeCategory === category.mealTypeCategory
                          ? null
                          : category.mealTypeCategory
                      );
                    }}
                  >
                    {category.mealTypeCategory}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
