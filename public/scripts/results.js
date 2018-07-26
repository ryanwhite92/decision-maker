$(document).ready(function() {

  function createPoll() {
      $.ajax({
        method: "GET",
        url: "/api/users" + window.location.pathname
      }).done((table) => {
          let $results = $("#results");

          document.chart = new Highcharts.Chart({
            chart: {
              type: 'column',
              renderTo: $results[0]
            },

            colors: ["#061539"],

            title: {
              text: table.question
            },

            xAxis: {
              categories: [table.options[0],
                          table.options[1],
                          table.options[2],
                          table.options[3]]
            },

            series: [{
              showInLegend: false,
              data: table.ranks
            }]
          });
      });

  }

  createPoll()
});





