import React from 'react';

import HeroDiv from '../../assets/styledComponents/HeroDiv';
import HeroTitle from '../../assets/styledComponents/HeroTitle';
import HomeDetails from '../../assets/styledComponents/HomeDetails';
import FlexColumnDiv from '../../assets/styledComponents/FlexColumnDiv';

const HomeRoute = () => {
  return (
    <div>
      <HeroDiv>
        <HeroTitle>Rivae</HeroTitle>
      </HeroDiv>
      <HomeDetails className="container">
        <FlexColumnDiv>
          <h3 className="subtitle is-3 has-text-centered">Full Integration</h3>
          <p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</p>
        </FlexColumnDiv>
        <FlexColumnDiv>
          <h3 className="subtitle is-3 has-text-centered">Easy Budgets</h3>
          <p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</p>
        </FlexColumnDiv>
        <FlexColumnDiv>
          <h3 className="subtitle is-3 has-text-centered">Quick Comparisons</h3>
          <p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</p>
        </FlexColumnDiv>
        <FlexColumnDiv>
          <h3 className="subtitle is-3 has-text-centered">More Stuff</h3>
          <p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem</p>
        </FlexColumnDiv>
      </HomeDetails>
    </div>
  );
};

export default HomeRoute;
