import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Chart from "react-apexcharts";

function App() {
  const [candlesData, setCandlesData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m"
        );

        setCandlesData(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    })();
  }, []);

  const seriesData = candlesData.map((candle) => ({
    x: new Date(candle[0]),
    y: [candle[1], candle[2], candle[3], candle[4]],
  }));

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "Японские свечи по BTC/USD",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: "100vw" }}>
      <Chart
        options={options}
        series={[
          {
            name: "price",
            data: seriesData,
          },
        ]}
        type="candlestick"
      />
    </div>
  );
}

export default App;
