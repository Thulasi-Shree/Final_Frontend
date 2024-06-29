import React from 'react';
import HomeSecondComp from './HomeSecondComp';
import HomeThirdComponent from './HomeThirdComponent';
import HomeFourthComp from './HomeFourthComp';
import './index.css';

const HomeComp = () => {
  return (
    <div className="HomeSecondMain">
      <div>
        <HomeSecondComp />
      </div>
      <div className="my-3">
        <HomeThirdComponent />
      </div>
      <div>
        <HomeFourthComp />
      </div>
    </div>
  );
};

export default HomeComp;
