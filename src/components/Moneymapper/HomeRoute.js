import React from 'react';

import HeroDiv from '../../assets/styledComponents/HeroDiv';
import HeroTitle from '../../assets/styledComponents/HeroTitle';
import HeroSubTitle from '../../assets/styledComponents/HeroSubTitle';
import HomeDetails from '../../assets/styledComponents/HomeDetails';
import HomeDetailsColumn from '../../assets/styledComponents/HomeDetailsColumn';

const HomeRoute = () => {
  return (
    <div>
      <HeroDiv>
        <HeroTitle>MoneyMapper</HeroTitle>
        <HeroSubTitle>A new way of managing your money</HeroSubTitle>
      </HeroDiv>
      <HomeDetails className="columns is-mobile">
        <HomeDetailsColumn className="column is-one-third-desktop is-full-mobile">
          <h3 className="subtitle is-3 has-text-centered is-full-mobile">Full Control</h3>
          <p>Always be aware of what your money is doing. With out wide-ranging data-visualization you will discover more than every about where every penny goes.</p>
        </HomeDetailsColumn>
        <HomeDetailsColumn className="column is-one-third-desktop is-full-mobile">
          <h3 className="subtitle is-3 has-text-centered">Strong Budgets</h3>
          <p>Once you have a grasp on where your moeny is going, the next step is taking control. We help you create easy monthly budgets, automatically tracking your spending and showing you areas to wokr on.</p>
        </HomeDetailsColumn>
        <HomeDetailsColumn className="column is-one-third-desktop is-full-mobile">
          <h3 className="subtitle is-3 has-text-centered">Easy Comparisons</h3>
          <p>Moneymapper offers it`s users an unprecedented level of comparison data. We aggregate everyones data to provide you with a context as to where you are at. This service is purely opt-in. </p>
        </HomeDetailsColumn>
      </HomeDetails>
    </div>
  );
};

export default HomeRoute;
