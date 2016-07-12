import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import ChangePW from './../../src/Components/ResidentChangePW.jsx';
import App from './../../src/Components/app.jsx';

describe('Change Password Component', () => {

  const appWrapper = mount(<App />);
  const setAppState = appWrapper.node.setAppState;
  const state = appWrapper.node.state;
  const wrapper = mount(<ChangePW setAppState={setAppState} getState={state} />);

  it('contains a form component', () => {
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('contains 3 password inputs', () => {
    expect(wrapper.find('input [type="password"]')).to.have.length(3);
  });

  it('contains a submit button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });

  // not working
  // it('displays confirm password error', () => {
  //   const passwordInputs = wrapper.find('input').nodes;
  //   const oldPassword = passwordInputs[0];
  //   const newPassword = passwordInputs[1];
  //   const confirmNewPassword = passwordInputs[2];
  //   oldPassword.value = 'hihi';
  //   newPassword.value = 'hello';
  //   confirmNewPassword.value = 'hola';
  //   wrapper.find('button').simulate('click');
  //   expect(wrapper.find('div #confirmPasswordError')).to.have.length(0);
  // });
});
