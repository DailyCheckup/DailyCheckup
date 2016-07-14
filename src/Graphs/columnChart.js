const drawColumnChart = {

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

  drawChart(data, i) {
    const questionData = google.visualization.arrayToDataTable(data.columnChartArray);

    const options = {
      chart: {
        // title: 'Question ' + (i + 1),
        // subtitle: data.question,
        width: 400,
        height: 300,
      },
      legend: { position: 'none' },
      theme: 'material',
    };
    // to get colors to work need to use google.visualization.ColumnChart
    const chart = new google.visualization.ColumnChart(document.getElementById('colChart_div' + i));
    chart.draw(questionData, options);
    //const chart = new google.charts.Bar(document.getElementById('colChart_div' + i));
    //chart.draw(questionData, google.charts.Bar.convertOptions(options));
  },
};

module.exports = drawColumnChart;
