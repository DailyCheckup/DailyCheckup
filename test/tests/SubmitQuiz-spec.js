import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import SubmitQuiz from './../../src/Components/Quiz/SubmitQuiz.jsx';

function bob() {
  console.log('hello there');
}

describe('submitQuiz button', () => {
  const wrapper = mount(<SubmitQuiz nextQuestion={bob} submitQuiz={bob} isSubmit={true} />);

  it('will contain a button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });
});
