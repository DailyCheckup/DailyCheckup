const React = require('react');
import { Link } from 'react-router';

const Quiz = React.createClass({
  getInitialState() {
    //need to check after last currentquestion
    return ({
      dailyQuestions: this.props.getState.dailyQuestions,
      currentQuestion: this.props.getState.dailyQuestions[0],
      questionNumber: 0,
      count: 10,
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
    obj.count = 10;
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
    obj.email = this.state.userEmail;
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
    number++;
    this.sendResults();
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
      const submitQuiz = (<button type="button" onClick={this.submitQuiz}>
      Send Quiz </button>);
      const currentQuestion = this.state.dailyQuestions[this.state.questionNumber];
      const nextQuestion = <button type="button" onClick={this.nextQuestion}> Next Question </button>;
      let questionE;
      if (currentQuestion.e) {
        questionE = (<div>
          <input type="radio" value={currentQuestion.e[0]} name="options" id="e" onChange={this.updateAnswer}></input>
          <label htmlFor="e"> {currentQuestion.e} </label> <br /> </div>);
      }
      return (
        <div>
            <div>TimeLeft: {this.state.count} seconds </div> <br />
            <div>Question number {this.state.questionNumber + 1} of
              {this.state.dailyQuestions.length} </div>
            <div> Question: {currentQuestion.question} </div> <br />
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
    } else if(this.props.getState.takenQuiz) {
      return (
        <div> Hello you have already taken this quiz today come back tommorrow. </div>
      );
    } else if(!this.props.getState.quizAvailability) {
      <div> Hello Eager Beaver, It's not time just yet to take this quiz. Try again later Alligator </div>
    } else {
      const dailyQs = this.props.getState.dailyQuestions;
      var answerArray = [];
      //set answer to lowercase
      //search taht key in dailyqs obj at slot i
      for (let i = 0; i < dailyQs.length; i++) {
        var rightLetter = dailyQs[i].answer.toLowerCase();
        var userLetter = this.state.results[i].submittedAnswer.toLowerCase();
        if (rightLetter === userLetter) {
            answerArray.push(<div> Correct! <br /><br /></div>);
        } else {
          answerArray.push(<div> Incorrect! <br /></div>);
        }
        answerArray.push(<div><br /> Question: {dailyQs[i].question} </div>);
        answerArray.push(<div> Your Answer: {dailyQs[i][userLetter]} <br /></div>);
        answerArray.push(<div> Correct Answer: {dailyQs[i][rightLetter]} <br /><br /></div>);
        answerArray.push(<div> Reason: {dailyQs[i].reason} <br /><br /></div>);
      }
      return (
        //need to display answers and reasons here
        <div>
          Your Results Have Been Submitted! <br />
          {answerArray}
          <button> <Link to="/resident/"> Go Home </Link> </button>
        </div>
      );
    }
  },
});

module.exports = Quiz;
