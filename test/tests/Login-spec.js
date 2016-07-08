import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Login from './../../src/Components/login.jsx';

const dummyResults = JSON.stringify(
  {
    results: {
      isAdmin: true,
      changedPassword: true,
      email: 'sandra@hi.com',
      dailyQuestions: [],
    },
  }
);

describe('Login Component', () => {

  const wrapper = shallow(<Login />);

  it('contains a form component', () => {
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('contains two inputs', () => {
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('contains an email input', () => {
    expect(wrapper.find('input [type="email"]')).to.have.length(1);
  });

  it('contains a password input', () => {
    expect(wrapper.find('input [type="password"]')).to.have.length(1);
  });

  it('contains a sign in button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });
});