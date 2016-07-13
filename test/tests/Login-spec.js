import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Login from './../../src/Components/login.jsx';
import App from './../../src/Components/app.jsx';
// import Server from './../fixtures/server-fixture.js';

let actualState = {};

function checkState(state) {
  actualState = state;
}

describe('Login Component', () => {

  const appWrapper = mount(<App />);
  const setAppState = appWrapper.node.setAppState;
  let state = appWrapper.node.state;
  let wrapper = mount(<Login setAppState={setAppState} getState={state} />);

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

  // it('should setState with the response that the component receives from the server', () => {
  //   wrapper = mount(<Login setAppState={checkState} getState={state} />);
  //   const email = wrapper.find('input [type="email"]');
  //   const password = wrapper.find('input [type="password"]');
  //   email.value = 'sandra@hi.com';
  //   password.value = 'blah';
  //   wrapper.find('button').simulate('click');
  //   setTimeout(() => {
  //     console.log('the actualState is ', actualState);
  //     expect(Object.keys(actualState).length).to.equal(0);
  //   }, 3000);
  // });
  //
  // it('should fail and display a login error', () => {
  //   wrapper = mount(<Login setAppState={checkState} getState={state} />);
  //   const email = wrapper.find('input [type="email"]');
  //   const password = wrapper.find('input [type="password"]');
  //   email.value = 'sandra@hi.com';
  //   password.value = '';
  //   wrapper.find('button').simulate('click');
  //   setTimeout(() => {
  //     expect(wrapper.find('div #loginError')).to.have.length(1);
  //     Server.destroy();
  //   }, 3000);
  // });



  // it('parses response data and sets state', () => {
  //   const appWrapper = mount(<App />);
  //   const setAppState = appWrapper.node.setAppState;
  //   const mountWrapper = mount(<Login setAppState={setAppState} />);
  //   const responseData = JSON.stringify(
  //     {
  //       email: 'sandra@hi.com',
  //       changedPassword: false,
  //       isAdmin: false,
  //       dailyQuestions: [],
  //       takenQuiz: false,
  //       quizAvailability: true,
  //       firstName: 'Sandra',
  //     }
  //   );
  //   console.log('mountwrapper ', mountWrapper);
  //   mountWrapper.node.parseDataAndSetState(responseData);
  //   expect(mountWrapper.state('userEmail')).to.equal('sandra');
  //   expect(mountWrapper.state('changedPassword')).to.equal('false');
  //   expect(mountWrapper.state('isAdmin')).to.equal('false');
  //   expect(mountWrapper.state('dailyQuestions')).to.equal('[]');
  //   expect(mountWrapper.state('takenQuiz')).to.equal('false');
  //   expect(mountWrapper.state('quizAvailability')).to.equal('true');
  //   expect(mountWrapper.state('firstName')).to.equal('sandra');
  // });
});
