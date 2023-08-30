import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './style.css';

const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: 40.1116668,
    lng: -75.0175593
  };

  
export default function MapRender ({apiKey}) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${apiKey}`
      })

      return isLoaded ? (
        <div id='maps'>
            <div id='description'>
                <h2 id='h2'>Chef Albos</h2>
                <p>
                    Chef Albos is an virtual restaurant serving traditional Albanian food in the heart of Northeast Philadelphia. Opened in May 2023, our mission is to serve the most delicious and authentic Albanian food in the region of Philadelphia. Restaurant is located at <a href='https://www.google.com/maps/place/1007+Delray+St,+Philadelphia,+PA+19116/@40.1116776,-75.0175534,17z/data=!3m1!4b1!4m6!3m5!1s0x89c6b259cbbc3dc3:0x41ea657427a59359!8m2!3d40.1116776!4d-75.0175534!16s%2Fg%2F11c163t7bh?entry=ttu' target='_blank'>1007 Delray st, Philadelphia, PA, 19116</a>
                </p>
            </div>
            <div id='map'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <Marker position={center}/>
        </GoogleMap>
        </div>
        </div>
    ) : <></>
}