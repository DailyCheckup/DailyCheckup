const drawColumnChart = {

  drawChart(name, dataArray, i, divName) {
    const questionData = google.visualization.arrayToDataTable(dataArray);
    let options = {};

    if (name === 'genre') {
      options = {
        chart: {
          width: '100%',
          height: 400,
        },
        tooltip: { isHTML: true },
        legend: { position: 'none' },
        theme: 'material',
        vAxis: { format: 'percent' },
      };
    }

    if (name === 'dailyData') {
      options = {
        chart: {
          width: '100%',
          height: 400,
        },
        tooltip: { isHTML: true },
        legend: { position: 'none' },
        theme: 'material',
      };
    }

    // to get colors to work need to use google.visualization.ColumnChart
    const chart = new google.visualization.ColumnChart(document.getElementById(divName + i));
    chart.draw(questionData, options);
    // Material design graphs
    //const chart = new google.charts.Bar(document.getElementById('colChart_div' + i));
    //chart.draw(questionData, google.charts.Bar.convertOptions(options));
  },
};

module.exports = drawColumnChart;
