import Chart from "react-apexcharts";
import BoxPlot from "../data/utils/boxPlotPercentiles";

// REACT COMPONENT
// -------------------------------------------------
function LikertBoxPlot({ responses, minStatement, maxStatement, title }) {

  let boxChartState = {
    options: {
      chart: {
        type: "boxPlot",
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
      },
      title: {
        align: "center",
        offsetX: 40,
        style: {
          fontSize: "28px",
          fontWeight: "bold",
        },
      },
      xaxis: {
        type: 'numeric',
        min: 1,
        max: 5,
        tickAmount: 4
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "50%",
        },
        boxPlot: {
          colors: {
            upper: "#e9ecef",
            lower: "#f8f9fa",
          },
        },
      },
      stroke: {
        colors: ["#6c757d"],
      },
    },
  };

  let data = BoxPlot(responses, minStatement, maxStatement);
  let chart = JSON.parse(JSON.stringify(boxChartState));
  chart.options.title.text = title;
  chart.series = [
    {
      data: data
    },
  ];

  return (
    <>
      <Chart options={chart.options} series={chart.series} type="boxPlot" />
    </>
  );
}

export default LikertBoxPlot;
