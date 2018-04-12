/* global describe, it */

// Primary Dependencies
import React from 'react';

// Testing Dependencies
import { expect } from 'chai';
import { shallow } from 'enzyme';

// Components to Test
import Home from '../src/components/Rivae/HomeRoute';
import App from '../src/app';


describe('Home tests', () => {

  it('should render', done => {

    const wrapper = shallow(<App />);
    expect(wrapper.childAt(0)).to.equal();
    done();
  });


});
