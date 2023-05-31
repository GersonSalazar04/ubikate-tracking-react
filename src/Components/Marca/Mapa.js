import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../../images/iconPerson.png";
import L from "leaflet";

export default function Map({ coords }) {

  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [50, 45],
    iconAnchor: [10, 30]
  });

  function MapView() {
    let map = useMap();
    map.setView(coords || [51.505, -0.09], map.getZoom());
     //Sets geographical center and zoom for the view of the map
    return null;
  }

  //console.log("coords",coords);
  //[-12.0432, -77.0282] (Lima)
  //[-11.10552, -77.60502] (Huacho Casa)

  return (
    <MapContainer
      center={coords || [51.505, -0.09]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: '820px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coords && 
        <Marker icon={customIcon} position={coords}>
          <Popup>Estas aqui</Popup>
        </Marker>
      }
      <MapView />
    </MapContainer>
  );
}