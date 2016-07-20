import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Login from './../../src/Components/login.jsx';
// import App from './../../src/Components/app.jsx';
// import Server from './../fixtures/server-fixture.js';

let actualState = {};

function checkState(state) {
  actualState = state;
}

describe('Login Component', () => {

  // const appWrapper = mount(<App />);
  // const setAppState = appWrapper.node.setAppState;
  let state = {
      userEmail: '',
      firstName: '',
      changedPW: '',
      isAdmin: '',
      dailyQuestions: [],
      takenQuiz: false,
      quizAvailability: false,
      confirmPasswordError: false,
      successfulPasswordChange: false,
      samePasswordError: false,
      loggedIn: false,
    };
  // let state = appWrapper.node.state;
  let wrapper = mount(<Login setAppState={checkState} getState={state} />);

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

  xit('should fail and display a login error', () => {
    wrapper = mount(<Login setAppState={checkState} getState={state} />);
    // wrapper.node.displayError();
    expect(wrapper.find('div #loginError')).to.have.length(0);
  });

  // it('should setState with the response that the component receives from the server', () => {
  //   wrapper = mount(<Login setAppState={checkState} getState={state} />);
  //   const responseData = {
  //     userEmail: 'sandra@hi.com',
  //     changedPW: false,
  //     isAdmin: false,
  //     dailyQuestions: [1, 2, 3, 4, 5],
  //     takenQuiz: false,
  //     quizAvailability: false,
  //     firstName: 'Sandra',
  //   }
  //   wrapper.node.parseDataAndSetState(JSON.stringify(responseData));
  //   expect(Object.keys(actualState)).to.have.length(0);
  // });
  //



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
