const React = require('react');
const DailyColumnChart = require('./../Graphs/DailyColumnChart.jsx');
const GenreChart = require('./../Graphs/GenreChart.jsx');
const DifficultyColumnChart = require('./../Graphs/DifficultyColumnChart.jsx');
//import { Link } from 'react-router';

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

  buildDifficultyGraphs(difficulty) {
    let difficultyGraphs = [];
    const difficultyArray = this.props.directorState.questionDifficultyData[difficulty];
    if (this.props.directorState[`${difficulty}DifficultyClicked`]) {
      for (let i = 0; i < difficultyArray.length; i++) {
        difficultyGraphs.push(<DifficultyColumnChart data={difficultyArray[i]} difficulty={difficulty} key={i} index={i} />);
      }
    } else {
      difficultyGraphs = '';
    }
    return difficultyGraphs;
  },

  difficultySelection(e) {
    const difficulty = e.currentTarget.innerText.toLowerCase();
    let stateObj = {};
    stateObj.easyDifficultyClicked = false;
    stateObj.mediumDifficultyClicked = false;
    stateObj.hardDifficultyClicked = false;
    if (this.props.directorState[`${difficulty}DifficultyClicked`]) {
      stateObj[`${difficulty}DifficultyClicked`] = false;
      this.props.setDirectorState(stateObj);
    } else {
      stateObj[`${difficulty}DifficultyClicked`] = true;
      this.props.setDirectorState(stateObj);
    }
  },

  render() {
    const dailyGraphs = this.buildDailyGraphs();
    const genreGraph = this.buildGenreGraph();
    const easyQuestions = this.buildDifficultyGraphs('easy');
    const mediumQuestions = this.buildDifficultyGraphs('medium');
    const hardQuestions = this.buildDifficultyGraphs('hard');

    return (
      <div id="directorResults clearfix">
        <h2>Group Statistics</h2>
        {genreGraph}
        <h2>Past Questions by Difficulty</h2>
        <button onClick={this.difficultySelection}>Easy</button>
        <button onClick={this.difficultySelection}>Medium</button>
        <button onClick={this.difficultySelection}>Hard</button>
        {easyQuestions}
        {mediumQuestions}
        {hardQuestions}
        <h2>Responses to Todays Quiz</h2>
        {dailyGraphs}
      </div>
    );
  },
});

module.exports = DirectorResults;
