const React = require('react');
const drawColumnChart = require('./../Graphs/columnChart.js');

const DifficultyColumnChart = React.createClass({

  componentDidMount() {
    google.charts.setOnLoadCallback(drawColumnChart.drawChart('difficultyData', this.props.data.columnChartArray, this.props.index, `${this.props.difficulty}ColChart`));
  },

  componentWillUpdate() {
    google.charts.setOnLoadCallback(drawColumnChart.drawChart('difficultyData', this.props.data.columnChartArray, this.props.index, `${this.props.difficulty}ColChart`));
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

    const answers = this.buildAnswers(this.props.data);

    return (
      <div>
        <h3> {Math.round(100 * (this.props.data.num_of_people_correct / this.props.data.num_of_people_total))}
          % Responded Correctly of {this.props.data.num_of_people_total} Residents</h3>
        <p>{this.props.data.question}</p>
        {answers}
        <div id={`${this.props.difficulty}ColChart${this.props.index}`} ></div>
      </div>
    );
  },
});

module.exports = DifficultyColumnChart;
