import React, { useState, useEffect} from "react";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  LoadScript,
  InfoWindow,
  InfoBox
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import CardInfoBox from "./cardInfoBox/CardInfoBox";

export default function MapWithMarkers(props) {

  const mapContainerStyle = {
    height: props.height,
    width: props.width,
    borderRadius: props.borderRadius,
    boxShadow: props.boxShadow,
  };

  const [center,setCenter] = useState({ 'lat': -38.416097, 'lng': -63.616672 })
  const [zoom,setZoom] = useState(5)

  const mapRef = React.useRef();

  const [propsData, setPropsData] = useState(null)


  const [parsedCoords, setParsedCoords] = useState(null)


  const [mapLoaded, setMapLoaded] = useState(false)

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    if (!mapLoaded) {
      setMapLoaded(true)
    }
    //setParsedCoords(null)
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
  }, []);

  const call = React.useCallback(
    async function call(address) {
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = getLatLng(results[0]);
        panTo({ lat, lng });
        return { lat, lng }
      } catch (e) { }
    },
    [panTo]

  );

  async function call2(address) {
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0])
      return { lat, lng }
    } catch (e) {

    }
  }
  
  const fetchCoords = React.useCallback(
    async function fetchCoords(address) {
      const fetchMapCoords = await Promise.all(
        props.data.map(async (e, i) => {
          return [await call2(e.address + ', ' + e.city.name + ', ' + e.city.country), e]
        })
      )
      return fetchMapCoords
    }
  )

  useEffect(() => {
    if(mapLoaded){
      if (parsedCoords === [] || !parsedCoords) {
        fetchCoords()
          .then(response => {
            setParsedCoords(response)
          })
      }
    }
  }, [mapLoaded])
 
  useEffect(() => {
    if (props.address) {
      call(props.address);
      setZoom(zoom===5?14:5);
    }
    if (!propsData) {
      setPropsData(props.data)
    }
    
  }, [props.data, props.address, parsedCoords, props.clickShowLocation])

  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", 
  };

  function createKey(location) {
    return location.lat + location.lng;
  }
  const [isInfoBox, setIsInfoBox] = useState({'show':false,"boxId":null});

  return (
    <LoadScript googleMapsApiKey="AIzaSyAzGgSvnxprQ9cjiXzvaGZijjY0Aa1GWas">
      <GoogleMap
        id="marker-example"
        mapContainerStyle={mapContainerStyle}
        onLoad={onMapLoad}
        center={center}
        zoom={zoom}
      >
        <MarkerClusterer options={options} averageCenter={true} >
          {(clusterer) =>
            parsedCoords?.map((location, index) => (
              <Marker
                key={createKey(location[0])}
                position={location[0]}
                clusterer={clusterer}
                onMouseOver={() => setIsInfoBox({'show':true,"boxId":index})}
                onMouseOut={() => setIsInfoBox({'show':false,"boxId":null})}
                onClick={()=>{
                  setCenter(location[0])
                  setZoom(zoom===5?14:5)
                }}
              >
                {isInfoBox.show && isInfoBox.boxId===index? (
                  <InfoBox>
                    <CardInfoBox info={location[1]} />
                  </InfoBox>
                ) : (
                  <></>
                )}
              </Marker>
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  );
}