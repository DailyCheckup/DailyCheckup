const drawColumnChart = require('./columnChart.js');

const drawPieChart = {
  drawChart() {
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Answer');
    data.addColumn('number', 'Percentage');
    data.addRows([
      ['Correct', 0.75],
      ['Incorrect', 0.25],
    ]);

    var options = {
      'title': 'Question 1',
      'width': 500,
      'height': 300,
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'select', drawColumnChart.drawChart);
  },

  // pieChartHandler(e) {
  //   console.log('inside pie chart click');
  //   // show table
  // },
};

module.exports = drawPieChart;
