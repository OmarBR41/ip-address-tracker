import React, { useEffect, useMemo, useState } from "react";

import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

import "./Map.css";
import iconLocation from "../images/icon-location.svg";

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
  iconSize: new L.Point(46, 56),
});

const applyOffset = (coords) => {
  return [coords[0] + OFFSET, coords[1]];
};

export default function Map({ coords }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const updateMarker = (coords) => {
    if (marker !== null) {
      map.removeLayer(marker);
    }
    let newMarker = L.marker(coords, { icon: markerIcon }).addTo(map);
    setMarker(newMarker);
  };

  // Update Map view
  useEffect(() => {
    if (map === null || coords === null) return;

    map.setView(applyOffset(coords), ZOOM);
    updateMarker(coords);
  }, [map, coords]);

  const displayMap = useMemo(
    () => (
      <MapContainer
        className="Map"
        center={applyOffset(coords)}
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
    [coords]
  );

  return <div>{displayMap}</div>;
}
