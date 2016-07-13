import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import ChangePW from './../../src/Components/ResidentChangePW.jsx';
import App from './../../src/Components/app.jsx';


// replace setAppState with this function when testing to see what is going to be
// sent to the stateful component (in this example, App is the stateful component)
// when testing to see what is being sent to state look at actualState

let actualState = {};

function checkState(state) {
  actualState = state;
}


describe('Change Password Component', () => {

  const appWrapper = mount(<App />);
  // console.log('appwrapper ', appWrapper.node);
  const setAppState = appWrapper.node.setAppState;
  let state = appWrapper.node.state;
  let wrapper = mount(<ChangePW setAppState={setAppState} getState={state} />);

  it('contains a form component', () => {
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('contains 3 password inputs', () => {
    expect(wrapper.find('input [type="password"]')).to.have.length(3);
  });

  it('contains a submit button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });

  // changing the state variable and then remounting (rerrendering) changePW component
  // to display the following errors
  it('displays confirm password error when state flag confirmPasswordError is set to true', () => {
    state.confirmPasswordError = true;
    wrapper = mount(<ChangePW setAppState={setAppState} getState={state} />);
    expect(wrapper.find('div #confirmPasswordError')).to.have.length(1);
    state.confirmPasswordError = false;
  });

  it('displays same password error when state flag samePasswordError is set to true', () => {
    state.samePasswordError = true;
    wrapper = mount(<ChangePW setAppState={setAppState} getState={state} />);
    expect(wrapper.find('div #samePasswordError')).to.have.length(1);
    state.samePasswordError = false;
  });

  it('displays successfulPasswordChange when state flag successfulPasswordChange is set to true', () => {
    state.successfulPasswordChange = true;
    wrapper = mount(<ChangePW setAppState={setAppState} getState={state} />);
    expect(wrapper.find('div #successfulPasswordChange')).to.have.length(1);
    state.successfulPasswordChange = false;
  });

// switched out setAppState with checkState function in order to to see what is being sent
// the stateful component (e.g. App)
  it('will set state parameters for a confirm password error to be true', () => {
    wrapper = mount(<ChangePW setAppState={checkState} getState={state} />);
    const passwordInputs = wrapper.find('input').nodes;
    const oldPassword = passwordInputs[0];
    const newPassword = passwordInputs[1];
    const confirmNewPassword = passwordInputs[2];
    oldPassword.value = 'hihi';
    newPassword.value = 'hello';
    confirmNewPassword.value = 'hola';
    wrapper.find('button').simulate('click');
    expect(actualState.confirmPasswordError).to.be.true;
    expect(actualState.samePasswordError).to.be.false;
    expect(actualState.samePasswordError).to.be.false;
  });

  // it('will set state parameters for a same password error to be true', ()=> {
  //
  // });
  // it( 'will set state parameters for a successfulPasswordChange to true', () => {
  //
  // });
<<<<<<< HEAD
=======


>>>>>>> master
});
