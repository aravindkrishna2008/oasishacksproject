import Image from "next/image";
const WeatherKey = ({ current }) => {
  if (current === "Temperature") {
    return (
      <>
        <div className="flex flex-row items-center gap-2">
          <Image src="/sunny.png" width={100} height={100} className="w-10 " />
          <p className="text-2xl">Sunny - 70-90</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Image
            src="/really_sunny.png"
            width={100}
            height={100}
            className="w-10 "
          />
          <p className="text-2xl">Baking - 80-100</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Image
            src="/burning.png"
            width={100}
            height={100}
            className="w-10 "
          />
          <p className="text-2xl">Burning - 100-120</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Image src="/deadly.png" width={100} height={100} className="w-10 " />
          <p className="text-2xl">Deadly - 120+</p>
        </div>
      </>
    );
  } else if (current === "Precipitation") {
    return (
      <>
        <div className="flex flex-row items-center gap-2">
          <Image src="/rain.png" width={100} height={100} className="w-10 " />
          <p className="text-2xl">Rain - 0-10</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Image src="/little.png" width={100} height={100} className="w-10 " />
          <p className="text-2xl">Little - 10-30</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Image
            src="/drought.png"
            width={100}
            height={100}
            className="w-10 "
          />
          <p className="text-2xl">Drought - 0-10</p>
        </div>
      </>
    );
  } else if (current === "Sea Level Pressure") {
    return (
      <>
        <div className="flex flex-row items-center gap-2">
          <Image src="/pressure.png" width={100} height={100} className="w-10 " />
          <p className="text-2xl">Normal - 0-10</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Image src="/pressure.png" width={100} height={100} className="w-10 " />
          <p className="text-2xl">Medium - 10-30</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Image
            src="/pressure.png"
            width={100}
            height={100}
            className="w-10 "
          />
          <p className="text-2xl">High - 0-10</p>
        </div>
      </>
    );
  }
};

export default WeatherKey;
