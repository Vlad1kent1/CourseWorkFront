import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Box, useTheme } from "@mui/material";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import cities from "../../data/cities.json";

function getCurvePoints(start, end) {
  const latlngs = [];
  const numPoints = 100;
  const deltaLat = (end[0] - start[0]) / numPoints;
  const deltaLng = (end[1] - start[1]) / numPoints;
  const dist = Math.sqrt(deltaLat * deltaLat + deltaLng * deltaLng);
  const amplitude = dist * 0.3;

  for (let i = 0; i <= numPoints; i++) {
    const lat = start[0] + i * deltaLat;
    const lng =
      start[1] + i * deltaLng + Math.sin((i / numPoints) * Math.PI) * amplitude;
    latlngs.push([lat, lng]);
  }
  return latlngs;
}

function Curve({ positions, color }) {
  console.log(positions);
  const map = useMap();

  useEffect(() => {
    if (positions.length !== 2) return;

    const latlngs = getCurvePoints(positions[0], positions[1]);

    const polyline = L.polyline(latlngs, { color: color || "blue" }).addTo(map);

    return () => {
      map.removeLayer(polyline);
    };
  }, [map, positions, color]);

  return null;
}

export default function FlightsMapComponent({ selectedDestination }) {
  const theme = useTheme({
    palette: {
      primary: {
        main: "#2196f3",
      },
    },
  });
  // const lvivCoordinates = [49.8397, 24.0297];
  const zhydachivCoordinates = [49.385, 24.144444];
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

  const getCityCoordinates = (cityName) => {
    if (!cityName) return null;

    const city = cities.find(
      (c) => c.name.toLowerCase() === cityName.toLowerCase()
    );
    if (city) {
      return [parseFloat(city.lat), parseFloat(city.lon)];
    } else {
      return null;
    }
  };

  useEffect(() => {
    const destinationCityCoordinates = getCityCoordinates(selectedDestination);
    setDestinationCoordinates(destinationCityCoordinates);
  }, [selectedDestination]);

  return (
    <Box
      style={{
        height: "60vh",
        width: "60vw",
        margin: "50px auto",
        border: `3px solid ${theme.palette.primary.main}`,
        borderRadius: "4px",
      }}
    >
      <MapContainer
        center={zhydachivCoordinates}
        zoom={3}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destinationCoordinates && (
          <Curve
            positions={[zhydachivCoordinates, destinationCoordinates]}
            color="blue"
          />
        )}
      </MapContainer>
    </Box>
  );
}
