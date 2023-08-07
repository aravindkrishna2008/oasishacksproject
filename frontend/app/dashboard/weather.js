import React, { useEffect, useState } from "react";
import WeatherCard from "./weather_card";

const Weather = ({ current }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.215:8000/show")
      .then((response) => response.json())
      .then((data) => setData(data))
      .then((data) => console.log(data))
      .catch((error) => console.error("An error occurred:", error));
  }, []);

  const getWeatherInfo = (item) => {
    if (current === "Temperature") {
      if (item.TAVG < 40) return "Sunny";
      if (item.TAVG < 50) return "Baking";
      if (item.TAVG < 80) return "Burning";
      return "Deadly";
    } else if (current === "Precipitation") {
      if (item.PRCP < 10) return "Rain";
      if (item.PRCP < 40) return "Little";
      return "Drought";
    } else if (current === "Sea Level Pressure") {
      if (item.ASLP < 1000) return "Small";
      if (item.ASLP < 1100) return "Small";
      if (item.ASLP < 1200) return "Small";

      return "Normal";
    }
  };

  const dates = [2, 4, 10, 25, 50, 100];

  return (
    <div className="flex flex-row gap-5">
      {data.map((item, index) => (
        <WeatherCard
          weather={getWeatherInfo(item)}
          time={`${dates[index]} Years`}
          key={index}
        />
      ))}
    </div>
  );
};

export default Weather;
