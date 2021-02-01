import React, { useCallback, useEffect, useMemo, useState } from "react";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "./Map.css";
import iconLocation from "../images/icon-location.svg";

const INITIAL_COORDS = [51.505, -0.09];
const OFFSET = 0.0002;
const ZOOM = 20;

const markerIcon = new L.Icon({
  iconUrl: iconLocation,
  iconRetinaUrl: iconLocation,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
});

const applyOffset = (coords) => {
  return [coords[0] + OFFSET, coords[1]];
};

export default function Map() {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(INITIAL_COORDS);

  useEffect(() => {
    if (map === null) return;

    L.marker(markerPosition, { icon: markerIcon }).addTo(map);
  }, [map, markerPosition]);

  const displayMap = useMemo(
    () => (
      <MapContainer
        className="Map"
        center={applyOffset(INITIAL_COORDS)}
        zoom={ZOOM}
        zoomControl={false}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    []
  );

  return <div>{displayMap}</div>;
}
