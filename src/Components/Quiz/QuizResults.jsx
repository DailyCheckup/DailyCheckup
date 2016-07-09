



const dailyQs = this.props.getState.dailyQuestions;
var answerArray = [];
//set answer to lowercase
//search taht key in dailyqs obj at slot i
for (let i = 0; i < dailyQs.length; i++) {
  var rightLetter = dailyQs[i].answer.toLowerCase();
  var userLetter = this.state.results[i].submittedAnswer.toLowerCase();
  if (rightLetter === userLetter) {
    answerArray.push(<div id="correctAnswer"> Correct</div>);
  } else {
    answerArray.push(<div id="wrongAnswer"> Incorrect</div>);
  }
  answerArray.push(
    <div className="answerContainer">
    <p> Question: {dailyQs[i].question} </p>
    <p> Your Answer: {dailyQs[i][userLetter]}</p>
    <p> Correct Answer: {dailyQs[i][rightLetter]}</p>
    <p> Reason: {dailyQs[i].reason}</p>
    </div>
  );
}
return (
  //need to display answers and reasons here
  <div className="quizAnswers">
  <p className="submittedQuiz">Your Results Have Been Submitted!</p>
  {answerArray}
  <button> <Link to="/resident/"> Home </Link> </button>
  </div>
);
