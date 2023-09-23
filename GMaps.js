import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { setLat, setLng } from './redux/actions';
import axios from 'axios';


const containerStyle = {
  width: '100%',
  height: '550px',
};

const center = {
  lat: -34.745,
  lng: -38.523,
};

function GMaps() {
  const city = useSelector((state) => state.city);
  

  const gkey = 'AIzaSyDRKJAqcMe_w5DKJzw5G4b8ScX9uVKeD4k'; 
  const dispatch = useDispatch();
  const location = useLocation();
  const [actualPosition, setActualPosition] = useState(center)
 

  useEffect(() => {
    if (location.pathname === `/map/${city}`) {
      LatLong(gkey);
    }
  }, []);

  const LatLong = (key) => {
    if (city) {
      const base = 'https://maps.googleapis.com/maps/api/geocode/json?address='
      const query = `${city}&key=${key}`
      axios.get(base + query).then((response) => {
        const { lat, lng } = response.data.results[0].geometry.location
        dispatch(setLat(lat));
        dispatch(setLng(lng));
        setActualPosition({ lat, lng });
      });
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: gkey,
  });

  const [map, setMap] = React.useState(null);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, [])

  useEffect(() => {
    if (map && actualPosition) {
      const bounds = new window.google.maps.LatLngBounds(actualPosition);
      map.fitBounds(bounds);
    }
  }, [map, actualPosition])

  return (
    <div>
      {isLoaded && location.pathname === `/map/${city}` ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={actualPosition}
          zoom={10}
          onUnmount={onUnmount}
        >
        </GoogleMap>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default GMaps;
