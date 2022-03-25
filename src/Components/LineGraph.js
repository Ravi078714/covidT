import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
// to fix memmory leak
Chart.register(...registerables);

const options = {
  plugins: { legend: { display: false } },
  layout: { padding: { bottom: 100 } },
  scales: {
    y: {
      ticks: {
        color: "white",
        font: {
          size: 18,
        },
      },
      grid: {
        color: "#243240",
      },
    },
    x: {
      ticks: {
        color: "white",
        font: {
          size: 18,
        },
      },
    },
  },
};

const LineGraph = (props) => {
  return (
    <div
      className="graph"
      style={{
        width: "1000px",
        height: "800px",
        margin: "50px auto",
      }}
    >
      <Line
        data={{
          labels: props.label.map((l) => l.substr(0, 10)),
          datasets: [
            {
              label: "Corona Positive",
              data: props.yAxis,
              fill: true,
              backgroundColor: "#2e4355",
              pointBorderColor: "#8884d8",
              pointBorderWidth: 5,
              pointRadius: 8,
              tension: 0.4,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

export default LineGraph;
