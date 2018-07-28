$(document).ready(function() {

  function createPoll() {
      $.ajax({
        method: "GET",
        url: "/api/users" + window.location.pathname
      }).done((table) => {
          let $results = $(".results");
          let optionArr = [];
          for (let i = 0; i < table.options.length; i++) {
            optionArr.push(table.options[i])
          }

          if (table.ranks.length < 1) {
            table.ranks = [1,1]
          }

          document.chart = new Highcharts.Chart({
            chart: {
              type: 'column',
              renderTo: $results[0]
            },

            colors: ["#061539"],

            title: {
              text: "Here's the current results for:"
            },

            subtitle: {
              text: table.question
            },

            xAxis: {
              categories: optionArr
            },

            yAxis: {

              title: {

                text: "Votes"
              },

              labels: {
                enabled: false
              }

            },

            series: [{
              showInLegend: false,
              data: table.ranks
            }]
          });
      });
  }

  function renderEmailList() {
    let path = window.location.pathname;
    path = path.replace("results", "response");
    console.log(path);

    $.ajax({
      method: "GET",
      url: "/api/users" + path
    }).done((responses) => {
      console.log(responses);
    });
  }

  createPoll();
  renderEmailList();
});





