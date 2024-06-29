
import React from 'react';
import HomeFirstComp from './HomeFirstComp';
import HomeSecondComp from './HomeSecondComp';
import HomeThirdComponent from './HomeThirdComponent';
import HomeFourthComp from './HomeFourthComp';
import './index.css';
import HomeComp from './HomeComp';

const Home = () => {
  return (
    <div>
      <div>
        <HomeFirstComp />
      </div>
      <div>
        <HomeComp />
      </div>
    </div>
  );
};

export default Home;
