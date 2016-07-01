import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Login from './../../src/Components/Login.jsx';

describe('Testing login component', () => {
  const wrapper = mount(<Login />);

  it('contains an email input', () => {
    expect(shallow(<Login />).find(<input type="email" />)).to.equal(true);
  });

  it('contains a password input', () => {
    expect(shallow(<Login />).find(<input type="password" />)).to.equal(true);
  });

});