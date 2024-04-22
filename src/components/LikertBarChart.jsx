import Chart from "react-apexcharts";
import { likertConverter } from "../data/utils/likertConverter";
import { statements } from "../data/statements";

// REACT COMPONENT
// -------------------------------------------------
function LikertBarChart({responses, minStatement, maxStatement, title}) {
  // DATA CONVERSION
  // -------------------------------------------------
  // Build required data structure using from args:
  // (JSON array, minimum and maximum statement number)
  let likertData = likertConverter(responses, minStatement, maxStatement);

  // CHART SETTINGS TEMPLATE
  // -------------------------------------------------
  // Set initial chart options (chart type, styles, etc.)
  const chartState = {
    options: {
      chart: {
        toolbar: {
          export: {
            csv: {
              filename: undefined,
            },
            svg: {
              filename: undefined,
            },
            png: {
              filename: undefined,
            },
          },
        },
        type: "bar",
        id: "basic-bar",
        stacked: true,
        height: 20,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: "#90A4AE",
        strokeDashArray: 10,
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        min: -responses.length,
        max: responses.length,
        tickAmount: responses.length,
        tickPlacement: "on",
      },
      yaxis: {},
      annotations: {
        xaxis: [
          {
            x: 0,
            borderColor: "#40AB40",
            borderWidth: 3,
            strokeDashArray: 0,
            label: {
              borderColor: "#40AB40",
              style: {
                color: "#fff",
                background: "#40AB40",
              },
              orientation: "horizontal",
              text: "Agreement Line",
              position: "top",
              offsetY: -10,
            },
          },
        ],
      },
      tooltip: {
        x: {
          show: true,
        },
        y: {
          show: true,
        },
      },
      fill: {
        opacity: 1,
      },
      stroke: {
        show: false,
      },
      colors: ["#DFDFDF","#e59f93", "#D5604C", "#B2182B", "#8ebdda", "#4392C2", "#2066AC"],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 60,
      },
      title: {
        align: "center",
        margin: 10,
        offsetX: 40,
        style: {
          fontSize: "28px",
          fontWeight: "bold",
        },
      },
    },
    series: [],
  };

  // COPY CHART SETTINGS
  // -------------------------------------------------
  let chart = JSON.parse(JSON.stringify(chartState));

  // CHART SPECIFIC SETUP
  // -------------------------------------------------
  // Set chart title
  chart.options.title.text = title;
  // Don't show negative (-) sign on x-axis labels
  chart.options.xaxis.labels = {
    formatter: (value) => Math.abs(value),
  };
  // Show actual statement text on tooltip hover
  chart.options.tooltip.x = {
    formatter: (val) => {
      let statementIndex = val.replace("Statement ", "");
      return `${statements[statementIndex]}`;
    },
  };
  // Add label suffix to tooltip text
  chart.options.tooltip.y = {
    formatter: (val) => `${Math.abs(val)} Participants`,
  };
  // Use statement array to generate axis categories and labels
  let filteredStatements = statements.slice(minStatement - 1, maxStatement);
  chart.options.xaxis.categories = filteredStatements.map((statement, i) => {
    return `Statement ${i + 1}`;
  });

  // CHART DATA SETUP
  // -------------------------------------------------
  chart.series = [
    {
      name: "Neutral",
      data: likertData.N,
    },
    {
      name: "Somewhat Disagree",
      data: likertData.SWD,
    },
    {
      name: "Disagree",
      data: likertData.D,
    },
    {
      name: "Strongly Disagree",
      data: likertData.SD,
    },
    {
      name: "Somewhat Agree",
      data: likertData.SWA,
    },
    {
      name: "Agree",
      data: likertData.A,
    },
    {
      name: "Strongly Agree",
      data: likertData.SA,
    },
  ];

  return (
    <>
      <Chart options={chart.options} series={chart.series} type="bar" />
    </>
  );
}

export default LikertBarChart;
