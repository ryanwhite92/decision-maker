$(document).ready(function() {

  function createPoll(table) {
    $(() => {
      $.ajax({
        method: "GET",
        url: "/api/users/"
      }).done((table) => {

          let $results = $("#results");

          document.chart = new Highcharts.Chart({
            chart: {
              type: 'column',
              renderTo: $results[0]
            },

            colors: ["#061539"],

            title: {
              text: table[0].question
            },

            xAxis: {
              categories: [table[0].email, table[0].question, table[0].id]
            },

            series: [{
              showInLegend: false,
              data: [5, 7, 3]
            }]
          });
      });

    });
  }

  createPoll("poll")

});





