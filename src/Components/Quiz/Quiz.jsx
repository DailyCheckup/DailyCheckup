const React = require('react');
import { Link } from 'react-router';
const QUIZ_TIME = 5;

const Quiz = React.createClass({
  getInitialState() {
    //need to check after last currentquestion
    return ({
      dailyQuestions: this.props.getState.dailyQuestions,
      currentQuestion: this.props.getState.dailyQuestions[0],
      questionNumber: 0,
      count: QUIZ_TIME,
      currentAnswer: 'N',
      stopTimer: false,
      results: [],
    });
  },

  componentDidMount() {
    this.startCountdown();
  },
  componentWillMount() {
    if (this.props.getState.takenQuiz || !this.props.getState.quizAvailability) {
      this.setState({questionNumber:this.state.dailyQuestions.length});
    }
  },
  startCountdown() {
    setTimeout(() => {
      if (!this.state.stopTimer) {
        if (this.state.count > 0) {
          let count = this.state.count;
          count--;
          this.startCountdown();
          this.setState({ count });
        } else {
          if (this.state.questionNumber === this.state.dailyQuestions.length - 1) {
            this.submitQuiz();
            //then give answers
          } else {
            this.nextQuestion();
            this.startCountdown();
          }
        }
      }
    }, 1000);
  },

  updateAnswer(e) {
    const answer = e.currentTarget.value;
    this.setState({ currentAnswer: answer[0] });
  },
  nextQuestion() {
    const obj = {};
    let count = this.state.questionNumber;
    obj.results = this.state.results;
    const currentSubmittedAnswer = this.buildResults(this.state.questionNumber);
    obj.results.push(currentSubmittedAnswer);
    count++;
    obj.currentAnswer = 'N';
    obj.count = QUIZ_TIME;
    obj.questionNumber = count;
    if (count === this.state.dailyQuestions.length) {
      count--;
      //might not need this anymore
    }
    obj.currentQuestion = this.state.dailyQuestions[count];
    this.clearbuttons();
    console.log(obj);
    this.setState(obj);
  },
  buildResults(index) {
    const obj = {};
    const currentQuestion = this.state.dailyQuestions[index];
    obj.email = this.props.getState.userEmail;
    console.log(obj.email, 'this is the email we jsut cahnged');
    obj.questionid = currentQuestion.questionid;
    obj.respondedCorrectly = currentQuestion.answer === this.state.currentQuestion;
    obj.submittedAnswer = this.state.currentAnswer;
    return obj;
  },
  clearbuttons() {
    const ele = document.getElementsByName('options');
    let i;
    for (i = 0; i < ele.length; i++) {
      ele[i].checked = false;
    }
  },
  submitQuiz() {
    let number = this.state.questionNumber;
    const changeAppState = { takenQuiz: true };
    number++;
    this.sendResults();
    this.props.setAppState(changeAppState);
    this.setState({
      questionNumber: number,
      stopTimer: true,
    });
  },
  sendResults() {
    const results = this.state.results;
    results.push(this.buildResults(this.state.questionNumber));
    const resultsData = {
      data: results,
    };
    const url = 'http://localhost:3000/userResponse'; // UPDATE WITH ROUTE
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(resultsData));
    xhr.onreadystatechange = function () {
      this.processResponse(xhr);
    }.bind(this);
  },

  processResponse(xhr) {
    // If request is done
    if (xhr.readyState === 4) {
      console.log('readystate is 4');
      // And status is OK
      if (xhr.status === 200) {
        console.log('status is 200');
        console.log(xhr.responseText);
      } else {
        // If error, email or password was incorrect so display error
        console.log('Error: ' + xhr.status);
        this.displayError();
      }
    }
  },

  displayError() {
    console.log('Failed!!!');
  },

  render() {
    if (this.state.questionNumber < this.state.dailyQuestions.length) {
      const submitQuiz = (<button onClick={this.submitQuiz}>
      Submit Quiz </button>);
      const currentQuestion = this.state.dailyQuestions[this.state.questionNumber];
      const nextQuestion = <button onClick={this.nextQuestion}> Submit </button>;
      let questionE;
      if (currentQuestion.e) {
        questionE = (<div>
          <input type="radio" value={currentQuestion.e[0]} name="options" id="e" onChange={this.updateAnswer}></input>
          <label htmlFor="e"> {currentQuestion.e} </label> <br /> </div>);
      }
      return (
        <div className="quiz clearfix">
            <p id="questionNum">Question: {this.state.questionNumber + 1} / {this.state.dailyQuestions.length}</p>
            <p id="timeCountdown">Timer: {this.state.count} seconds </p>
            <p id="singleQuestion"> Question: {currentQuestion.question} </p>
            <form>
              <input type="radio" name="options" id="a" value={currentQuestion.a[0]} onChange={this.updateAnswer}></input>
              <label htmlFor="a"> {currentQuestion.a} </label> <br />
              <input type="radio" name="options" id="b" value={currentQuestion.b[0]} onChange={this.updateAnswer}></input>
              <label htmlFor="b"> {currentQuestion.b} </label> <br />
              <input type="radio" name="options" id="c" value={currentQuestion.c[0]} onChange={this.updateAnswer}></input>
              <label htmlFor="c"> {currentQuestion.c} </label> <br />
              <input type="radio" name="options" id="d" value={currentQuestion.d[0]} onChange={this.updateAnswer}></input>
              <label htmlFor="d"> {currentQuestion.d} </label> <br />
              {currentQuestion.e !== 'null' ?
              questionE : ''}
            </form>
            {this.state.questionNumber === this.state.dailyQuestions.length - 1 ?
              submitQuiz : nextQuestion}
        </div>
          );
    } else if (this.props.getState.takenQuiz) {
      return (  
        <div className="quizError">
          <p> You have already taken today's quiz.</p>
          <p>Please return tomorrow to take a new quiz. </p>
        </div>
      );
    } else if (!this.props.getState.quizAvailability) {
      return (
        <div> It is currently outside of quiz-taking hours. Please try again later.</div>
      );
    } else {
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
    }
  },
});

module.exports = Quiz;
