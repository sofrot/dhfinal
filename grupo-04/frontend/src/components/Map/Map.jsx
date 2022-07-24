import React, { useState, useEffect, useCallBack } from "react";
import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const libraries = ["places"];



export default function Map(props) {
  // const mapContainerStyle = {
  //   height: "350px",
  //   width: "100%",
  //   borderRadius: "10px",
  //   boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.25)"
  // };
  const mapContainerStyle = {
    height: props.height,
    width: props.width,
    borderRadius: props.borderRadius,
    boxShadow: props.boxShadow
  };
  
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAzGgSvnxprQ9cjiXzvaGZijjY0Aa1GWas",
    libraries,
  });

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
  }, []);

  useEffect(()=>{
    if (props.adress) {
      call(props.adress)
    }else{
      call("Argentina")
    }
  },[call, panTo, props.adress])

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  async function call(address) {
    try{
      
      const results = await getGeocode( {address} );
      
      const { lat, lng } = getLatLng(results[0]);
      panTo({ lat, lng });
    }catch(e){
      //aca podemos dar aviso si algo salio mal
      //y cargar alguna direccion por defecto
    }
  }

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={props.adress?14:4}
        options={options}
        onLoad={onMapLoad}
      >
        <Marker style={{height:"30px", backGroundColor:"black"}}/>
      </GoogleMap>
    </div>
  );
}