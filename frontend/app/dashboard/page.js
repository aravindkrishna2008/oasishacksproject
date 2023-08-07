"use client";
import {
  faSearch,
  faLocationDot,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

import Weather from "./weather";
import WeatherKey from "./weather_key";

import { useState } from "react";

import Map from "./map";

const Dashboard = () => {
  const [selectedChip, setSelectedChip] = useState([
    {
      name: "Temperature",
      selected: true,
    },
    {
      name: "Precipitation",
      selected: false,
    },
    {
      name: "Sea Level Pressure",
      selected: false,
    },
  ]);

  const [current, setCurrent] = useState("Temperature");

  return (
    <div className="bg-[#11105] p-8">
      <div className="flex flex-row justify-between h-10 items-center mb-10">
        <Link
          className="p-3 flex items-center h-12 w-12 justify-center bg-[#1E1E1E] rounded-full  cursor-pointer"
          href="/"
        >
          <FontAwesomeIcon icon={faHome} className="text-[#A0A0A0] h-6" />
        </Link>
        <div className="flex flex-row items-center p-2">
          <FontAwesomeIcon icon={faLocationDot} className="text-white h-6" />
          <h1 className="p-2 ml-1">Phoenix, Arizona</h1>
        </div>
        <div className="w-4/5 bg-[#1E1E1E] flex flex-row p-2 h-10 pl-8 rounded-full items-center">
          <FontAwesomeIcon icon={faSearch} className="text-[#A0A0A0] h-4/5" />
          <input
            className="ml-4 bg-transparent outline-none w-full"
            placeholder="Search city..."
          />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-[60vw]">
          <div className="flex flex-row mb-4 gap-2 cursor-pointer">
            {selectedChip.map((chip) => {
              return (
                <div
                  onClick={() => {
                    const newChips = selectedChip.map((c) => {
                      if (c.name === chip.name) {
                        return {
                          ...c,
                          selected: true,
                        };
                      } else {
                        return {
                          ...c,
                          selected: false,
                        };
                      }
                    });
                    setSelectedChip(newChips);
                    setCurrent(chip.name);
                  }}
                  className={`flex flex-row items-center p-2 rounded-full ${
                    chip.selected ? "bg-violet-700" : "bg-[#1E1E1E]"
                  }`}
                >
                  <h1
                    className={`text-white ${chip.selected ? "font-bold" : ""}`}
                  >
                    {chip.name}
                  </h1>
                </div>
              );
            })}
          </div>
          <Weather current={current} />
          <div className="mt-4 rounded-lg overflow-hidden">
            <Map current={current} />
          </div>
        </div>
        <div className="flex flex-col w-2/5">
          <div className="bg-[#1b1b1d] rounded-2xl ml-4 h-[36vh] w-[100%] flex flex-col p-10 gap-5 justify-center">
            <h1 className="text-white text-2xl font-bold">Icons Key</h1>
            <WeatherKey current={current} />
          </div>
          <div className="bg-[#1b1b1d] rounded-2xl ml-4 h-[50vh] w-[100%] flex flex-col p-10 gap-5 justify-center mt-6">
            <h1 className="text-white text-2xl font-bold">
              What this means to YOU
            </h1>
            To prepare and prevent for future climate challenges, it is crucial
            to establish a robust climate monitoring system, conduct research to
            understand the implications of changing climate patterns, and take
            measures to mitigate greenhouse gas emissions. Disaster
            preparedness, water management, and coastal protection strategies
            should be developed to cope with extreme weather events and rising
            sea levels. Climate education should be promoted to raise awareness
            and encourage sustainable practices. International cooperation is
            vital in addressing climate change as a global issue, with countries
            working together to share knowledge and collaborate on effective
            solutions. However, comprehensive and up-to-date climate data and
            expert analysis are essential for formulating targeted and
            successful climate adaptation and mitigation strategies.
          </div>
        </div>
      </div>
      <footer>
        <p>Copyright 2023 All rights reserved</p>
      </footer>
    </div>
  );
};

export default Dashboard;
