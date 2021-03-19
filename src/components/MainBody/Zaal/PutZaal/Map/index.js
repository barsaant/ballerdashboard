import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Loader from "../../../../Loader";
import styles from "../_.module.css";

const Map = (props) => {
  const [loading, setLoading] = useState(true);
  const mapStyles = {
    height: "100%",
    width: "100%",
  };
  const [coordinate, setCoordinate] = useState({
    lat: parseFloat(props.lat),
    lng: parseFloat(props.lng),
  });
  const [center, setCenter] = useState({
    lat: parseFloat(props.lat),
    lng: parseFloat(props.lng),
  });
  const changeCoordinate = (e) => {
    setCoordinate({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  useEffect(() => {
    props.changeLat(coordinate.lat);
    props.changeLng(coordinate.lng);
  }, [coordinate]);

  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Газрын зураг</h1>
      <div className={styles.coordinate}>
        <p>Latitude: {coordinate.lat}</p>
        <p>Longitude: {coordinate.lng}</p>
      </div>
      <div className={styles.map}>
        <LoadScript googleMapsApiKey="AIzaSyDcV7RTxeoY7PAdDWjYAlhd84o5TEGs_h4">
          <GoogleMap
            onLoad={() => setLoading(false)}
            mapContainerStyle={mapStyles}
            zoom={14}
            center={center}
            onClick={changeCoordinate}
          >
            <Marker position={coordinate} />
          </GoogleMap>
        </LoadScript>
        {loading && (
          <div className={styles.loadContainer}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
