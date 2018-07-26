$(document).ready(function() {

    var $results = $("#results");

    document.chart = new Highcharts.Chart({
        chart: {
            renderTo: $results[0],
        },
        xAxis: {
            categories: ['Option 1', 'Option 2', 'Option 3']
        },

        series: [{
            data: [5, 7, 3]
        }]
    });
});

