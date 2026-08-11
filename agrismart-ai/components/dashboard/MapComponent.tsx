"use client";

import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const farms = [
  {
    id: 1,
    name: "North Block A",
    position: [19.0760, 72.8777] as [number, number],
    polygon: [
      [19.0760, 72.8777],
      [19.0770, 72.8787],
      [19.0750, 72.8797],
      [19.0740, 72.8787],
    ] as [number, number][],
    status: "Healthy",
    moisture: "45%"
  }
];

export default function MapComponent() {
  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden border border-border/50 shadow-sm relative z-0">
      <MapContainer 
        center={[19.0760, 72.8777]} 
        zoom={15} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        
        {farms.map(farm => (
          <div key={farm.id}>
            <Polygon 
              positions={farm.polygon} 
              pathOptions={{ color: 'var(--primary)', fillColor: 'var(--primary)', fillOpacity: 0.2 }} 
            />
            <Marker position={farm.position} icon={icon}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg">{farm.name}</h3>
                  <p className="text-sm">Status: <span className="text-emerald-500">{farm.status}</span></p>
                  <p className="text-sm">Moisture: {farm.moisture}</p>
                </div>
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </div>
  );
}
