// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import { usePlanContext } from "../../context/context";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.MAPS_TOKEN;

export const Map = () => {
    const {startingLat, startingLng, coordinatesArray} = usePlanContext()
    const mapContainer = useRef();

    useEffect(() => {
        let map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [startingLng, startingLat],
            zoom: 14
        })
        map.once('load', function() {
            map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': coordinatesArray
                    }
                }
            });
            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#ffa07a',
                    'line-width': 8
                }
            });
        })
        return () => map.remove();
    }, []);
    return (
        <div>
            <div className="map-container" ref={mapContainer} />
        </div>
    );
};