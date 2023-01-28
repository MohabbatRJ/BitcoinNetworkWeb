Chart.pluginService.register({
    beforeRender: function (chart) {
      if (chart.config.options.showAllTooltips) {
        // create an array of tooltips
        // we can't use the chart tooltip because there is only one tooltip per chart
        chart.pluginTooltips = [];
        chart.config.data.datasets.forEach(function (dataset, i) {
          chart.getDatasetMeta(i).data.forEach(function (sector, j) {
            chart.pluginTooltips.push(
              new Chart.Tooltip(
                {
                  _chart: chart.chart,
                  _chartInstance: chart,
                  _data: chart.data,
                  _options: chart.options.tooltips,
                  _active: [sector],
                },
                chart
              )
            );
          });
        });
  
        // turn off normal tooltips
        chart.options.tooltips.enabled = false;
      }
    },
    afterDraw: function (chart, easing) {
      if (chart.config.options.showAllTooltips) {
        // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
        if (!chart.allTooltipsOnce) {
          if (easing !== 1) return;
          chart.allTooltipsOnce = true;
        }
  
        // turn on tooltips
        chart.options.tooltips.enabled = true;
        Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
          tooltip.initialize();
          tooltip.update();
          // we don't actually need this since we are not animating tooltips
          tooltip.pivot();
          tooltip.transition(easing).draw();
        });
        chart.options.tooltips.enabled = false;
      }
    },
  });
  
  let myChart = document.getElementById("myChart").getContext("2d");
  // Global Options
  Chart.defaults.global.defaultFontFamily = "Lato";
  Chart.defaults.global.defaultFontSize = 14;
  Chart.defaults.global.defaultFontColor = "rgba(0,0,0,0.5)";
  
  var xValues = [20, 40, 60, 80];
  let massPopChart = new Chart(myChart, {
    // new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [
        {
          data: [20, 30, 20, 30],
          fill: true,
          backgroundColor: "rgba(232, 245, 236,0.5)",
          pointBackgroundColor: "transparent",
          pointBorderColor: "rgba(0, 143, 51,1)",
          pointBorderWidth: "1",
          strokeColor: "black",
          borderWidth: 1.5,
          borderColor: "rgb(0, 143, 51)",
        },
        {
          data: [10, 40, 15, 20],
          fill: false,
          borderWidth: 1.5,
          borderColor: "rgba(40, 44, 52,0.3)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false,
      },
      tooltips: {
        displayColors: false,
        bodyColor: "#000",
        titleFontColor: "#000",
        titleColor: "#fff",
        // cornerRadius: 8,
        // footerMarginTop: 30,
        backgroundColor: "rgba(40, 44, 52,0.088)",
        // caretPadding: 10,
        // caretSize: 5,
        footerColor: "#fff",
        // padding: 15,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
          },
        ],
        yAxes: [
          {
            id: "A",
            fontFamily: "DINPRO, Arial, sans-serif",
            position: "right",
          },
        ],
      },
      showAllTooltips: true,
    },
  });