import { useState, useEffect } from "react";
import Image from "next/image";

const WeatherCard = ({ weather = "Baking", time = "2 Years" }) => {
  const [image, setImage] = useState("/loading.png");

  useEffect(() => {
    if (weather === "Sunny") {
      setImage("/sunny.png");
    } else if (weather === "Baking") {
      setImage("/really_sunny.png");
    } else if (weather === "Burning") {
      setImage("/burning.png");
    } else if (weather === "Deadly") {
      setImage("/deadly.png");
    } else if (weather === "Rain") {
      setImage("/rain.png");
    } else if (weather === "Little") {
      setImage("/little.png");
    } else if (weather === "Drought") {
      setImage("/drought.png");
    } else if (weather === "Normal") {
      setImage("/pressure.png");
    }
  });

  return (
    <div className="h-64 w-[15%] bg-[#1b1b1d] rounded-3xl flex flex-col items-center p-2 justify-evenly">
      <h1 className="text-white text-xl font-bold h-1/5 flex items-center">
        {time}
      </h1>
      <div className="w-4/5 h-[1px] mt-1 bg-[#343436]" />
      <Image src={image} width={100} height={100} className="mt-2 h-2/5" />
      <h1 className="text-2xl font-bold h-1/5">{weather}</h1>
    </div>
  );
};

export default WeatherCard;
