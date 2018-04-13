/* global describe, it */

// Primary Dependencies
import React from 'react';

// Testing Dependencies
import { expect } from 'chai';
import { shallow } from 'enzyme';

// Components to Test
import Budget from '../../src/components/Rivae/BudgetRoute';


describe('Budget tests', () => {

  it('should render', done => {

    const props = {
      match: {
        params: {
          id: '5acce4a5a01de10004881f8f'
        }
      }
    };

    const wrapper = shallow(<Budget {...props} />);
    const testData = {
      absoluteSpendingByDate: {initial: 0, '2017-12-31': -64.49000000000001, '2017-12-30': -26.75, '2017-12-29': 1224.19, '2017-12-28': 151.85999999999999},
      admin: true,
      avatar: 'https://enbaca.com/web/assets/image-resources/avatar.png',
      balance: 1266.0500000000002,
      balanceByDate: {initial: 0, 'Thu Nov 30 2017 00:00:00 GMT+0000 (UTC)': 1640.06, 'Fri Dec 01 2017 00:00:00 GMT+0000 (UTC)': 1613.96, 'Sat Dec 02 2017 00:00:00 GMT+0000 (UTC)': 1300.56, 'Mon Dec 04 2017 00:00:00 GMT+0000 (UTC)': 1246.31},
      budget: [],
      categories: ['cash', 'eating_out', 'entertainment', 'expenses', 'general', 'groceries', 'shopping', 'transport', 'travel'],
      created: '2018-04-10T16:21:57.245Z',
      email: 'test@test.com',
      id: '5acce4a5a01de10004881f8f',
      sortedCategories: ['cash', 'eating_out', 'entertainment', 'expenses', 'general', 'groceries', 'shopping', 'transport', 'travel'],
      username: 'test',
      __v: 0,
      _id: '5acce4a5a01de10004881f8f'};
    wrapper.setState({ user: testData });
    expect(wrapper.children().length).to.not.equal(0);
    done();
  });

});
