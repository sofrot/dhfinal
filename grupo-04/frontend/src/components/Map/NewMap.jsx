import React, { useState, useEffect } from 'react'
import { GoogleMap, InfoBox, LoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import CardInfoBox from './cardInfoBox/CardInfoBox';

const containerStyle = {
  height: "350px",
  width: "100%",
  borderRadius: "10px",
  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.25)"
};

const NewMap = (props) => {
  const mapRef = React.useRef();
  const handleLoad = React.useCallback((map) => {
    if (!mapRef) {
      mapRef.current = map;
    }
    
  
  }, [mapRef]);
  const [center, setCenter] = useState(
    localStorage.getItem("latitud")
      ?
      { lat: parseFloat(localStorage.getItem("latitud")), lng: parseFloat(localStorage.getItem("longitud")) }
      :
      { lat: -3.745, lng: -38.523 });

  const [data, setData] = useState(null);
  const [isInfoBox, setIsInfoBox] = useState(false);

  useEffect(() => {
    if (props.city)
      convertLatLng(props.city);

    if (props.cardInfo)
      setData(props.cardInfo);

  }, [props.city, isInfoBox]);

  const convertLatLng = async (address) => {
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);
      setCenter({ lat, lng });
      localStorage.setItem("latitud", lat);
      localStorage.setItem("longitud", lng);

    } catch (e) {
      //aca podemos dar aviso si algo salio mal
      //y cargar alguna direccion por defecto
    }
  }

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAzGgSvnxprQ9cjiXzvaGZijjY0Aa1GWas"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={handleLoad}
      >
        { /* Child components, such as markers, info windows, etc. */}
        <Marker
          position={center}
          clickable={true}
          onMouseOver={() => setIsInfoBox(true)}
          onMouseOut={() => setIsInfoBox(false)}
        >
          {isInfoBox ?
            <InfoBox position={center} >
              <CardInfoBox infoBox={data} />
            </InfoBox>
            :
            <></>
          }
        </Marker>

      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(NewMap)