import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = (props) => {
  const { products } = props;

  const sortedProducts = Array.isArray(products)
    ? [...products].sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort in ascending order
    : [];

  const labels = sortedProducts.map((item) => new Date(item.date)); // Keep as Date object
  const prices = sortedProducts.map((product) => product.price);

  const todaysPrice = prices[prices.length - 1];
  const averagePrice = (
    prices.reduce((a, b) => a + b, 0) / prices.length
  ).toFixed(2);
  const priceChange = todaysPrice - averagePrice;

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: prices,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "#fff",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: true,
        labels: {
          font: {
            size: 16, // Increase legend label font size
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            let date = new Date(context.label).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            let price = context.raw.toFixed(2); // Ensure price has two decimal places
            return `Date: ${date}\nPrice: $${price}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        title: {
          display: true,
          text: "Date",
          font: {
            size: 18, // Increase x-axis title font size
          },
        },
        time: {
          unit: "day", // Display labels weekly
          tooltipFormat: "MMM dd, yyyy",
          displayFormats: {
            day: "MMM dd", // Format the display of weeks
          },
        },
        ticks: {
          font: {
            size: 14, // Increase x-axis label font size
          },
          autoSkip: true, // Automatically skips labels when they overlap
          maxRotation: 0, // Prevents label rotation
          minRotation: 0, // Prevents label rotation
        },
      },
      y: {
        title: {
          display: true,
          text: "Price ($)",
          font: {
            size: 18, // Increase y-axis title font size
          },
        },
        ticks: {
          font: {
            size: 14, // Increase y-axis label font size
          },
          callback: function (value) {
            return value.toFixed(2); // Ensure the value is always displayed with two decimal places
          },
        },
      },
    },
  };

  return (
    <>
      <div className="chart-title">
        <h1>Trend of Egg Prices</h1>

        <h3>
          Today's Price: $
          {!todaysPrice ? <span>Loading...</span> : todaysPrice.toFixed(2)}
        </h3>
        <h3>
          Average Price: $
          {averagePrice !== Number ? averagePrice : <span>Loading...</span>}
        </h3>
        {priceChange > 0 ? (
          <h3 style={{ color: "green" }}>
            Price Change: +${priceChange.toFixed(2)}
          </h3>
        ) : priceChange < 0 ? (
          <h3 style={{ color: "red" }}>
            Price Change: ${priceChange.toFixed(2)}
          </h3>
        ) : (
          <h3 style={{ color: "gray" }}>
            Price Change: ${priceChange.toFixed(2)}
          </h3>
        )}
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default Chart;
