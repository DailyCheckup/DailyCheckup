import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Timer from './../../src/Components/Quiz/Timer.jsx';

const count = 60;
describe('<Timer/>', () => {
  const wrapper = shallow(<Timer seconds={count} />);
  it('will have a paragraph tag', () => {
    expect(wrapper.find('p')).to.have.length(1);
  });
});
