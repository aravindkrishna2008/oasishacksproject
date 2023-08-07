import Image from "next/image";
import {
  faDroplet,
  faThermometer3,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div class="hero-container">
          <h1 class="heroh1">Climate Vision</h1>
          <p class="heroparagraph">
            Explore the wonders of our planet's climate like never before with
            ClimateVision, the cutting-edge app that empowers you to predict
            climate change and stay informed about the evolving environmental
            landscape. As the world faces unprecedented challenges, arming
            yourself with knowledge is key, and that's where ClimateVision steps
            in.
          </p>
          <a href="/dashboard" class="herobutton">
            Check it Out
          </a>
          <div class="empty">
            <img class="heroimage" src="/map.png"></img>
          </div>
        </div>
      </section>
      <section>
        <div class="features">
          <h2>Features</h2>
          <div class="frgid">
            <div class="grids">
              <h3>Map</h3>
              <p>
                Find your city on the map to see how climate change will affect
                it.{" "}
              </p>
            </div>
            <div class="grids">
              <h3>Climate</h3>
              <p>
                Our app will give you a comprehensive climate overview of your
                city for the next 100 years. This includes temperature,
                precipitation, and sea level pressure;
              </p>
            </div>
            <div class="grids">
              <h3>Reccomendations</h3>
              <p>
                Our app will show give you reccomendations on how to combat
                climate change in your city.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <p>Copyright 2023 All rights reserved</p>
      </footer>
    </main>
  );
}
