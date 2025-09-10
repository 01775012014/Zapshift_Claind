import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import warehouseData from "../../assets/warehouses.json";

// ডিফল্ট marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Helper component → সার্চ রেজাল্ট পেলে ম্যাপে জুম করা
const FlyToLocation = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo([location.latitude, location.longitude], 12, {
        animate: true,
        duration: 2, 
      });
    }
  }, [location, map]);

  return null;
};

const Available64Distists = () => {
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  // সার্চ ফিল্টার
  const filteredData = warehouseData.filter(
    (w) =>
      w.district.toLowerCase().includes(query.toLowerCase()) ||
      w.city.toLowerCase().includes(query.toLowerCase()) ||
      w.covered_area.some((area) =>
        area.toLowerCase().includes(query.toLowerCase())
      )
  );

  // Search 
  const handleSearch = () => {
    if (filteredData.length > 0) {
      setSelectedLocation(filteredData[0]); 
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-2xl w-full  shadow">
      <h2 className="text-4xl font-bold text-center mb-4">
        We are available in 64 districts
      </h2>

      {/* Search bar */}
      <div className="flex justify-center  mb-6">
        <input
          type="text"
          placeholder="Search by district, city or area"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border text-black p-2 w-1/3"
        />
        <button
          onClick={handleSearch}
          className="bg-lime-500 text-white px-4 rounded-r-lg"
        >
          Search
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">
        We deliver almost all over Bangladesh
      </h3>

      {/* Map Section */}
      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={10}
        className="h-[500px] w-full rounded-lg"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {filteredData.map((branch, idx) => (
          <Marker key={idx} position={[branch.latitude, branch.longitude]}>
            <Popup>
              <h4 className="font-bold">
                {branch.city}, {branch.district}
              </h4>
              <p>Areas: {branch.covered_area.join(", ")}</p>
              <a
                href={branch.flowchart}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Flowchart
              </a>
            </Popup>
          </Marker>
        ))}

       
        <FlyToLocation location={selectedLocation} />
      </MapContainer>
    </div>
  );
};

export default Available64Distists;
