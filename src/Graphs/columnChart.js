let drawColumnChart = {

  // drawChart() {
  //   let data = google.visualization.arrayToDataTable([
  //     ['Selection', 'Percentage'],
  //     ['A', 0.45],
  //     ['B', 0.10],
  //     ['C', 0.15],
  //     ['D', 0.20],
  //     ['E', 0.10],
  //   ]);

  //   let view = new google.visualization.DataView(data);

  //   let options = {
  //     'title': 'Question 1',
  //     'width': 500,
  //     'height': 300,
  //   };

  //   var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  //   chart.draw(data, options);
  // },

//this.toggle = 0,

  drawChart() {
    const data = google.visualization.arrayToDataTable([
      ['Selection', 'Percentage'],
      ['A', 0.45],
      ['B', 0.10],
      ['C', 0.15],
      ['D', 0.20],
      ['E', 0.10],
    ]);

    const options = {
      chart: {
        title: 'Question 1',
        subtitle: 'Of those who have taken the quiz',
      },
    };

    const chart = new google.charts.Bar(document.getElementById('colChart_div'));
    chart.draw(data, options);
  },
};

module.exports = drawColumnChart;
