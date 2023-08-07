"use client";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import * as turf from "@turf/turf";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHY1NjY3IiwiYSI6ImNsMzJhbGc4bjBiMTAzam4zNTdpbTlyMjgifQ.sw4_WWNH-YZjaN9lrSea2w";

const App = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("click", (e) => {
      setPoints((prevPoints) => [...prevPoints, [e.lngLat.lng, e.lngLat.lat]]);
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    const drawPolygon = () => {
      if (points.length < 3) {
        return;
      }

      try {
        const polygon = new mapboxgl.Popup()
          .setLngLat(points[0])
          .setHTML(
            `<h1>Polygon Area: ${turf
              .area(turf.polygon([points]))
              .toLocaleString()} sq. meters</h1>`
          )
          .addTo(map.current);

        new mapboxgl.Marker().setLngLat(points[0]).addTo(map.current);
        new mapboxgl.Marker()
          .setLngLat(points[points.length - 1])
          .addTo(map.current);

        const polygonLayer = map.current.getSource("polygon");
        if (polygonLayer) {
          polygonLayer.setData(turf.polygon([points]));
        } else {
          map.current.addSource("polygon", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [points],
              },
            },
          });

          map.current.addLayer({
            id: "polygon-layer",
            type: "fill",
            source: "polygon",
            paint: {
              "fill-color": "#F2B705",
              "fill-opacity": 0.5,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    drawPolygon();
  }, [points]);

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-700 bg-opacity-90 text-white px-3 py-2 font-mono z-10">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="flex-1 relative">
        <div ref={mapContainer} className="h-full" />
        <div className="absolute top-0 left-0 m-4">
          <button
            onClick={() => {
              setPoints([]);
              map.current.getSource("polygon").setData({
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [],
                },
              });
            }}
            className="bg-blue-700 text-white px-3 py-2 rounded-md hover:bg-blue-800"
          >
            Clear Polygon
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
