import React from 'react'
import Contact from './Contact';
import AboutUs from './AboutUs';
import WhatWeOffer from './WhatWeOffer';
import styles from './styles.module.css';
import WelcomeSection from './WelcomeSection';
import HomeSecondComp from '../LandingPage/HomeSecondComp';
import HomeFourthComp from '../LandingPage/HomeFourthComp';

const Main = () => {
  return (
    <div  className={styles.main} >
         <AboutUs />
         <HomeSecondComp />
        <WelcomeSection />     
      <WhatWeOffer />
      <HomeFourthComp />
    </div>
  )
}

export default Main
