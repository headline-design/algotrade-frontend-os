import ReactApexChart from "react-apexcharts";

const AlgoApex = ({ data }) => {
  const chartOptions = {
    series: [
      {
        name: "Algo in USD",
        data: data,
      },
    ],
    options: {
      chart: {
        width: "100%",
        parentHeightOffset: -20,
        height: 300,
        type: "area",
        stacked: false,
        background: "none",
        foreColor: "#999999",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#546E7A"],
      stroke: {
        width: 2,
      },
      grid: {
        show: false,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      markers: {
        size: 0,
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        tickAmount: 5,
        opposite: true,
        labels: {
          show: true,
          style: {
            colors: ["#fff"],
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
          formatter: function (data) {
            return "$" + data.toFixed(4).replace(/\d(?=(\d{3})+\.)/g, "$&,");
          },
        },
      },
      crosshairs: {
        show: false,
      },
      tooltip: {
        marker: false,
        theme: "dark",
        enabled: true,
        x: {
          show: true,
          format: "MMM",
        },
        style: {
          fontSize: "12px",
          fontFamily: undefined,
          color: "#1f2733",
          background: "#fff",
          opacity: 100,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        axisTicks: {
          show: false,
        },
        lines: {
          show: false,
        },
        categories: data.x,
        labels: {
          show: false,
          format: "HH",
        },
      },
      colors: ["#77B6EA", "#545454"],
      fill: {
        colors: ["#445775"],
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: "#445775",
          inverseColors: true,
          opacityFrom: 0.5,
          opacityTo: 0.1,
          colorStops: [],
        },
      },
    },
  };

  return (
    <ReactApexChart
      id="AlgorandChart"
      options={chartOptions.options}
      series={chartOptions.series}
      type="area"
      width="100%"
      height="250"
    ></ReactApexChart>
  );
};

export default AlgoApex;
