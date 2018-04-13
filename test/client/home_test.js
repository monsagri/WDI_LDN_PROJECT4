/* global describe, it */

// Primary Dependencies
import React from 'react';

// Testing Dependencies
import { expect } from 'chai';
import { shallow } from 'enzyme';

// Components to Test
import Home from '../../src/components/Rivae/HomeRoute';


describe('Home tests', () => {

  it('should render', done => {

    const wrapper = shallow(<Home />);
    expect(wrapper.children().length).to.equal(2);
    done();
  });

  // Testing styled components is such a pain

  it('should render the Apps Title and Subtitle in the hero', done => {

    const wrapper = shallow(<Home />);
    expect(wrapper.childAt(0).childAt(0).childAt(0).text()).to.equal('Rivae');
    expect(wrapper.childAt(0).childAt(1).childAt(0).text()).to.equal('A new way of managing your money');
    done();
  });




});
