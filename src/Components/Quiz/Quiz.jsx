const React = require('react');
const Answers = require('./Answers.jsx');
import { Link } from 'react-router';
const SubmitQuiz = require('./SubmitQuiz.jsx');
const Timer = require('./Timer.jsx');
const QuizResults = require('./QuizResults.jsx');
const QUIZ_TIME = 300;


const Quiz = React.createClass({
  propTypes: {
    getState: React.PropTypes.object,
    setAppState: React.PropTypes.func,
  },
  getInitialState() {
    // need to check after last currentquestion
    return ({
      // dailyQuestions: this.props.getState.dailyQuestions,
      // currentQuestion: this.props.getState.dailyQuestions[0],
      questionNumber: 0,
      count: QUIZ_TIME,
      currentAnswer: 'N',
      stopTimer: false,
      results: [],
      showResults: false,
      submitQuiz: false,
    });
  },
  componentWillMount() {
    if (this.props.getState.takenQuiz || !this.props.getState.quizAvailability) {
      this.setState({ questionNumber: this.props.getState.dailyQuestions.length });
    }
  },
  componentDidMount() {
    if (!this.props.getState.takenQuiz && this.props.getState.quizAvailability) {
      this.startCountdown();
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
          if (this.state.submitQuiz) {
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
    if (obj.questionNumber === this.props.getState.dailyQuestions.length - 1) {
      obj.submitQuiz = true;
    }
    if (count === this.props.getState.dailyQuestions.length) {
      count--;
      // might not need this anymore
    }
    obj.currentQuestion = this.props.getState.dailyQuestions[count];
    this.clearbuttons();
    console.log(obj);
    this.setState(obj);
  },
  buildResults(index) {
    const obj = {};
    const currentQuestion = this.props.getState.dailyQuestions[index];
    obj.email = this.props.getState.userEmail;
    obj.questionid = currentQuestion.questionid;
    obj.respondedCorrectly = currentQuestion.answer === this.props.getState.dailyQuestions[this.state.questionNumber];
    obj.submittedAnswer = this.state.currentAnswer;
    return obj;
  },
  buildAnswers() {
    const currentQuestion = this.props.getState.dailyQuestions[this.state.questionNumber];
    const answerArray = [];
    for (let key in currentQuestion) {
      if (key === 'a' || key === 'b' || key === 'c' || key === 'd' || key === 'e') {
        if (currentQuestion[key] !== 'null') {
          answerArray.push(<Answers
            id={key}
            currentQuestion={currentQuestion}
            updateAnswer={this.updateAnswer}
            key={key}
          />);
        }
      }
    }
    return answerArray;
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
      showResults: true,
    });
  },
  sendResults() {
    const results = this.state.results;
    results.push(this.buildResults(this.state.questionNumber));
    const resultsData = {
      data: results,
    };
    console.log(results, 'this is results');
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
    // if the quiz has questions still to take, render the quiz questions and answer
    if (!this.state.showResults) {
      const currentQuestion = this.props.getState.dailyQuestions[this.state.questionNumber];
      const answerArray = this.buildAnswers();
      return (
        <div className="quiz clearfix">
          <p id="questionNum">Question: {this.state.questionNumber + 1} / {this.props.getState.dailyQuestions.length}</p>
          <Timer seconds={this.state.count} />
          <p id="singleQuestion"> Question: {currentQuestion.question} </p>
          {answerArray}
          <SubmitQuiz isSubmit={this.state.submitQuiz} submitQuiz={this.submitQuiz} nextQuestion={this.nextQuestion} />
        </div>
      );
      // if the quiz has already been taken then show an error that lets the user know
      // while displaying the results of the quiz they have taken that day
    } else if (this.state.showResults) {
      // will show the results of the quiz that was just taken
      return (
        <div>
          <QuizResults dailyQuestions={this.props.getState.dailyQuestions} results={this.state.results} />
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
    }
  },
});

module.exports = Quiz;
