import { useEffect, useCallback, useState } from "react";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { MarkerF } from "@react-google-maps/api";
import { getCoordinates } from "../utils/geolocation";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const markerPosition = {
  lat: 52.489587,
  lng: 13.485512,
};

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function Maps() {
  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const fetchCoordinates = useCallback(async () => {
    const data = await getCoordinates();
    setCoordinates({ lat: data.coords.latitude, lng: data.coords.longitude });
  }, []);

  useEffect(() => {
    fetchCoordinates();
  }, [fetchCoordinates]);

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={coordinates} zoom={14}>
        <MarkerF onLoad={onLoad} position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
}

export default Maps;
