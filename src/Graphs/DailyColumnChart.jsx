const React = require('react');
const drawColumnChart = require('./../Graphs/columnChart.js');
// google.charts.load('current', {'packages':['corechart', 'bar']});

const DailyColumnChart = React.createClass({

  componentDidMount() {
    google.charts.setOnLoadCallback(drawColumnChart.drawChart('dailyData', this.props.data.columnChartArray, this.props.index, 'dailyColChart'));
  },

  determineQuestionDifficulty() {
    const percentCorrect = this.props.data.num_of_people_correct / (this.props.data.num_of_people_correct + this.props.data.num_of_people_incorrect);
    if (percentCorrect >= 0.8) {
      return (<div className='color-green'>Difficulty: Easy</div>);
    }
    if (percentCorrect >= 0.51) {
      return (<div className='color-orange'>Difficulty: Medium</div>);
    }
    if (percentCorrect >= 0) {
      return (<div className='color-red'>Difficulty: Hard</div>);
    }
  },

  buildAnswers(obj) {
    const answersArray = [];
    const selections = ['a_option', 'b_option', 'c_option', 'd_option', 'e_option'];
    selections.forEach(function (letter) {
      if (obj[letter] !== 'null') {
        answersArray.push(<p>{obj[letter]}</p>);
      }
    });
    return answersArray;
  },

  render() {

    const questionDifficulty = this.determineQuestionDifficulty();
    const totalPeople = this.props.data.num_of_people_correct + this.props.data.num_of_people_incorrect;
    const answers = this.buildAnswers(this.props.data);
    //const style = {height: '400px'};

    return (
      <div>
        <h2>Question {this.props.index + 1}</h2>
        <h3>{questionDifficulty} 
          {Math.round(100 * (this.props.data.num_of_people_correct / totalPeople))}
          % Responded Correctly of {totalPeople} Residents</h3>
        <p>{this.props.data.question}</p>
        {answers}
        <div id={'dailyColChart' + this.props.index} ></div>
      </div>
    );
  },
});

module.exports = DailyColumnChart;
