import React from 'react';
import Loader from 'layout/Loader';
import { Button, ListGroup } from 'react-bootstrap';
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
        <button variant="link" onClick={handleClearFilter} className="clear-button1 my-2 text-danger">
          <FaTimes /> Clear
        </button>
        {/* <hr /> */}
        {loading ? (
          <Loader />
        ) : (
          <div className="col-12">
            <div className=" col-12">
            <ListGroup.Item style={{ fontSize: '0.8rem', textAlign: "center" }}>Preferences</ListGroup.Item>
              <ol className="" style={{ listStyleType: 'none' }}>
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
                      cursor: 'pointer',
                      fontSize: '0.9rem'
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
            <div className="course my-3">
              <ListGroup.Item style={{ fontSize: '0.8rem', textAlign: "center" }}>Course</ListGroup.Item>
              <ol className="grid gap-3" style={{ listStyleType: 'none' }}>
                {mealCategories.map(category => (
                  <li
                    key={category._id}
                    className="filter-item"
                    style={{
                      color:
                        mealTypeCategory === category.mealTypeCategory
                          ? 'red'
                          : 'black',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      marginLeft: '0px'
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
