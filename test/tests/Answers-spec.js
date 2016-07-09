import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Answers from './../../src/Components/Quiz/Answers.jsx';


describe('<Answers/>', () => {
  const wrapper = shallow(<Answers />);
  it('will have a form', () => {
    wrapper.find('form').to.have.length(0);
  });
});
