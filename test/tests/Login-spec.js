import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Login from './../../src/Components/login.jsx';
// import App from './../../src/Components/app.jsx';

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

  // it('should retrieve email entered into input field', () => {
  //   const wrapperMount = mount(<Login />);
  //   //const emailLoginWrapper = wrapperMount.find('.emailLogin').mount();
  //   const form = wrapperMount.find('input [type="email"]');
  //   form.value = 'sandra@hi.com';
  //   console.log('form value', form.value);
  //   //console.log('ref input email value', emailLoginWrapper.find('input').ref('inputEmail'));
  //   wrapperMount.find('button').simulate('click');
  //   expect(wrapperMount.find('input [type="email"]').node.ref('inputEmail')).to.equal('sandra@hi.com');
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
