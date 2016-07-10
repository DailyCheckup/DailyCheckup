import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Answers from './../../src/Components/Quiz/Answers.jsx';

const question = {
  a:"A) severe joint pain",
  answer:"A",
  b:"B) marked joint space narrowing on radiologic studies",
  c:"C) destruction and loss of motion of the contralateral joint",
  chosen:true,
  createdAt:"2016-07-07T05:53:11.776Z",
  d:"D) an acutely infected joint",
  e:"null",
  genre:"GI",
  id:139,
  question:"139. A 70-year-old retired farmer presents with an angulated right knee and a painful hip. He asksyou about the possibility of having knee replacement surgery, although he is not eager to do so.You would advise him that the major indication for knee replacement is",
  questionid:139,
  reason:"39The major indication for joint replacement is severe joint pain. Loss of joint function and radiographicevidence of severe destruction of the joint may also be considered in the decision. The appearance of thejoint and the status of the contralateral joint may be minor considerations. Surgical insertion of a foreignbody into an infected joint is contraindicated. Ref: Zhang W, Moskowitz RW, Nuki G, et al: OARSI recommendations for the management of hip and knee osteoarthritis, PartII: OARSI evidence-based, expert consensus guidelines. Osteoarthritis Cartilage 2008;16(2):137-162. ",
updatedAt:"2016-07-08T01:32:24.410Z",
};

function bob() {
  console.log('hello there');
}

describe('<Answers/>', () => {
  const wrapper = shallow(<Answers id="a" currentQuestion={question} updateAnswer={bob} />);
  it('will have an input', () => {
    expect(wrapper.find('input')).to.have.length(1);
  });
  it('will have a label', () => {
    expect(wrapper.find('label')).to.have.length(1);
  });
});
