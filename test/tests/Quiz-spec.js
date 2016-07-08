import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Quiz from './../../src/Components/Quiz/Quiz.jsx';
import Answers from './../../src/Components/Quiz/Answers.jsx';

const testQuestions = [{
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
updatedAt:"2016-07-08T01:32:24.410Z"},
{a:"A) Emollients",
answer:"D",
b:"B) Pimecrolimus (Elidel)",
c:"C) Mupirocin (Bactroban)",
chosen:true,
createdAt:"2016-07-07T05:53:11.779Z",
d:"D) Corticosteroids",
e:"E) Antihistamines",
genre:"Endocrine",
id:177,
question:"178. A mother brings her 10-year-old son to your office because he has recently experienced aflare-up of atopic dermatitis, including increased pruritus. Physical findings include increasederythema of the involved skin on the flexural surfaces of his arms and legs, with weepingeruptions located within areas of lichenification.Which one of the following topical treatments for managing this episode is supported by the bestavailable evidence?",
questionid:178,
reason:"78Emollients are a mainstay of chronic therapy for atopic dermatitis (SOR C), but topical corticosteroids arethe first-line treatment for flare-ups (SOR A). Calcineurin inhibitors such as pimecrolimus are asecond-line treatment for moderate to severe atopic dermatitis (SOR A). Antibiotics are not useful inreducing flare-ups of atopic dermatitis unless there is clear evidence of a secondary infection (SOR A).Neither topical nor oral antihistamines are recommended for routine treatment of atopic dermatitis becausethey are not effective in treating the associated pruritus. Ref: Berke R, Singh A, Guralnick M: Atopic dermatitis: An overview. Am Fam Physician 2012;86(1):35-42. ",
updatedAt:"2016-07-08T01:32:24.410Z"}
];

describe('Testing Quiz Component', () => {
  const testState = {
    userEmail: '',
    changedPW: '',
    isAdmin: '',
    dailyQuestions: testQuestions,
    takenQuiz: false,
    quizAvailability: false,
  };

  const wrapper = mount(<Quiz getState={testState} />);

  it('should have an Answers Component', () => {
    //console.log(wrapper.find('Answers'), 'download atom pls')
    expect(wrapper.find(Answers)).to.have.length(0);
  });

});
