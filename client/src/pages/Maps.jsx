import React from 'react';

const Maps = () => {
    let map;
    let latValue = 40.1116668;
    let lngValue = -75.0175593;
    async function initMap() {
      // The location of Uluru
      const position = { lat: latValue, lng: lngValue };
      // Request needed libraries.
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    
      // The map, centered at Uluru
      map = new Map(document.getElementById("map"), {
        zoom: 15,
        center: position,
        mapId: "DEMO_MAP_ID",
      });
    
      // The marker, positioned at Uluru
      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Uluru",
      });
    }
    
    initMap();
      
    return (
    <div id="map">
    </div>
    )
};

export default Maps;