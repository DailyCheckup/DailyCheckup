import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Login from './../../src/Components/Login.jsx';

const dummyResults1 = JSON.stringify(
  {
    results: {
      isAdmin: true,
      changedPassword: true,
      email: 'sandra@hi.com',
      dailyQuestions: ['question1', 'question2', 'question3'],
    },
  }
);

describe('Testing login component', () => {
  const wrapper = mount(<Login />);

  it('contains an email input', () => {
    expect(shallow(<Login />).find(<input type="email" />)).to.equal(true);
  });

  it('contains a password input', () => {
    expect(shallow(<Login />).find(<input type="password" />)).to.equal(true);
  });

});