const drawListTable = {

  drawTable(tableName, dataArray, divId) {
    const data = google.visualization.arrayToDataTable(dataArray);
    let options = {};
    if (tableName === 'quizTaken') {
      options = {
        sortColumn: 1,
        sortAscending: false,
        allowHtml: true,
      };
    }

    const table = new google.visualization.Table(document.getElementById(divId));
    
    google.visualization.events.addListener(table, 'ready', function () {
      drawListTable.setBooleanStyling();
      drawListTable.setNumberCentering();   
    });

    google.visualization.events.addListener(table, 'sort', function () {
      drawListTable.setBooleanStyling();
      drawListTable.setNumberCentering();
    });

    table.draw(data, options);
  },

  setBooleanStyling() {
    const booleanElements = document.getElementsByClassName('google-visualization-table-td-bool');
    for (let i = 0; i < booleanElements.length; i++) {
      if (booleanElements[i].innerText === '✔') {
        booleanElements[i].classList.add('color-green');
      } else {
        booleanElements[i].classList.add('color-red');
      }
    }
  },

  setNumberCentering() {
    const tableNums = document.getElementsByClassName('google-visualization-table-td-number');
    for (let i = 0; i < tableNums.length; i++) {
      tableNums[i].style['text-align'] = 'center';
    }
  },
};

module.exports = drawListTable;
