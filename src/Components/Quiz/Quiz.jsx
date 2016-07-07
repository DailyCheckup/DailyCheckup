const React = require('react');
const Answers = require('./Answers.jsx');
import { Link } from 'react-router';
const QUIZ_TIME = 300;

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
    if(!this.props.getState.takenQuiz && this.props.getState.quizAvailability) {
      this.startCountdown();
    }
  },
  componentWillMount() {
    if (this.props.getState.takenQuiz || !this.props.getState.quizAvailability) {
      this.setState({ questionNumber: this.state.dailyQuestions.length });
    }
  },
  startCountdown() {
    // handles the timer countdown by calling setTimeout as long as the count is above 0
    // or if the stopTimer flag is set to true to signal the end of a quiz
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
            // then give answers
          } else {
            this.nextQuestion();
            this.startCountdown();
          }
        }
      }
    }, 1000);
  },

  updateAnswer(e) {
    // sets state to the current chosen answer by the radio button
    const answer = e.currentTarget.value;
    this.setState({ currentAnswer: answer[0] });
  },
  nextQuestion() {
    // next question builds up object to set state to the next question and pushes
    // the current answer into a results array that will later be sent off to
    const obj = {};
    let count = this.state.questionNumber;
    obj.results = this.state.results;
    obj.results.push(this.buildResults(this.state.questionNumber));
    count++;
    obj.currentAnswer = 'N';
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

  renderQuiz() {
    const currentQuestion = this.state.dailyQuestions[this.state.questionNumber];

    const submitQuiz = <button onClick={this.submitQuiz}> Submit Quiz </button>;
    const nextQuestion = <button onClick={this.nextQuestion}> Submit </button>;
    let seconds = this.state.count % 60;
    if(seconds < 10) {
      seconds = "0" + seconds;
    }


    return (
      <div className="quiz clearfix">
      <p id="questionNum">Question: {this.state.questionNumber + 1} / {this.state.dailyQuestions.length}</p>
      <p id="timeCountdown">Timer: {Math.floor(this.state.count/60)}:{seconds} </p>
      <p id="singleQuestion"> Question: {currentQuestion.question} </p>
      <Answers currentQuestion={currentQuestion} updateAnswer={this.updateAnswer} />
      {this.state.questionNumber === this.state.dailyQuestions.length - 1 ? submitQuiz : nextQuestion}
      </div>
    );
  },

  render() {
    // if the quiz has questions still to take, render the quiz questions and answer
    if (this.state.questionNumber < this.state.dailyQuestions.length) {
      return this.renderQuiz();
      // if the quiz has already been taken then show an error that lets the user know
      // while displaying the results of the quiz they have taken that day
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
