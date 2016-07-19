const React = require('react');
const DailyColumnChart = require('./../Graphs/DailyColumnChart.jsx');
const GenreChart = require('./../Graphs/GenreChart.jsx');

const DirectorResults = React.createClass({

  buildDailyGraphs() {
    let columnGraphArray = [];
    const todaysQuestions = this.props.directorState.dailyQuestionData;
    if (todaysQuestions.length === 0) {
      columnGraphArray = (<p>Loading...</p>);
    } else if (typeof todaysQuestions === 'string') {
      columnGraphArray = (<p>No quizzes have been submitted today.</p>);
    } else {
      for (let i = 0; i < todaysQuestions.length; i++) {
        columnGraphArray.push(<DailyColumnChart data={todaysQuestions[i]} key={i} index={i} />);
      }
    }
    return columnGraphArray;
  },

  buildGenreGraph() {
    let genreGraph = '';
    if (this.props.directorState.genreData) {
      genreGraph = (<GenreChart data={this.props.directorState.genreData} />);
    }
    return genreGraph;
  },

  render() {
    const columnGraphArray = this.buildDailyGraphs();
    const genreGraph = this.buildGenreGraph();

    return (
      <div>
        <h2>Group Statistics</h2>
        {genreGraph}
        <h2>Responses to Todays Quiz</h2>
        {columnGraphArray}
      </div>
    );
  },
});

module.exports = DirectorResults;
