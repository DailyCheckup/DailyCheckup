const React = require('react');
const drawColumnChart = require('./../Graphs/columnChart.js');

const GenreChart = React.createClass({

  componentDidMount() {
    google.charts.setOnLoadCallback(drawColumnChart.drawChart('genre', this.props.data.genreChartData, '', 'genreChart'));
  },

  render() {
    return (
      <div>
        <h2>Percent Answered Correctly by Category</h2>
        <div id='genreChart'></div>
      </div>
    );
  },
});

module.exports = GenreChart;
