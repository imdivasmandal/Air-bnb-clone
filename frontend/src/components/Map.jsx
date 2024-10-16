import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = "pk.eyJ1IjoiZ3lhbnNpbmdoNjg0MCIsImEiOiJjbHR1YmdqeTgxOGRxMmp1bHQ0enB2dGx0In0.ySoVSlDDJUBLgr6uwFC_Fw";

const Map = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude], // Starting position [lng, lat]
      zoom: 10, 
    });


    new mapboxgl.Marker({color: 'red'})
      .setLngLat([longitude, latitude])
      .addTo(map);

        return () => map.remove();

    }, [latitude, longitude]);
       

  return (
    <div className='place-content-center'>
      <div ref={mapContainerRef} style={{ width: '100%', height: '300px' }}/>
    </div>
  );
};

export default Map;


