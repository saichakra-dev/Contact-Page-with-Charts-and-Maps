import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons not showing in some environments
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Configure Leaflet's default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// TypeScript interfaces for the fetched data
interface CountryInfo {
  _id: number;
  lat: number;
  long: number;
  flag: string;
}

interface CountryData {
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: CountryInfo;
}

const fetchCountriesData = async (): Promise<CountryData[]> => {
  const response = await axios.get("https://disease.sh/v3/covid-19/countries");
  return response.data;
};

const Map: React.FC = () => {
  // Use React Query to fetch country-specific COVID-19 data
  const { data, isLoading, error } = useQuery<CountryData[]>({
    queryKey: ["countriesData"],
    queryFn: fetchCountriesData,
  });

  if (isLoading) return <p className="text-center">Loading map...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading map data.</p>;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-2xl mb-4 text-center font-semibold">
        COVID-19 Cases by Country
      </h2>
      <MapContainer
        center={[20, 0]} // Centered globally
        zoom={2}
        style={{ height: "600px", width: "100%" }}
        scrollWheelZoom={false}
      >
        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render a marker for each country */}
        {data &&
          data.map((country) => (
            <Marker
              key={country.countryInfo._id || country.country} // Fallback to country name if _id is unavailable
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold">{country.country}</h3>
                  <img
                    src={country.countryInfo.flag}
                    alt={`${country.country} flag`}
                    className="w-16 h-auto my-2 mx-auto"
                  />
                  <p>
                    <strong>Active:</strong> {country.active.toLocaleString()}
                  </p>
                  <p>
                    <strong>Recovered:</strong>{" "}
                    {country.recovered.toLocaleString()}
                  </p>
                  <p>
                    <strong>Deaths:</strong> {country.deaths.toLocaleString()}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
