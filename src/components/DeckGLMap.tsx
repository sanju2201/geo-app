"use client";

import React, { useRef, useEffect } from 'react';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { LineLayer } from '@deck.gl/layers';
import mapboxgl from 'mapbox-gl';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

const DeckGLMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const initialViewState = {
    longitude: -122.45,
    latitude: 37.78,
    zoom: 12,
    pitch: 50,
    bearing: 0,
  };

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Initialize the Mapbox map
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        accessToken: MAPBOX_ACCESS_TOKEN,
        center: [initialViewState.longitude, initialViewState.latitude],
        zoom: initialViewState.zoom,
        pitch: initialViewState.pitch,
        bearing: initialViewState.bearing,
      });

      // Add Deck.gl overlay to the Mapbox map
      const overlay = new MapboxOverlay({
        layers: [
          new LineLayer({
            id: 'line-layer',
            data: [
              { sourcePosition: [-122.45, 37.78], targetPosition: [-122.43, 37.76] },
            ],
            getSourcePosition: (d) => d.sourcePosition,
            getTargetPosition: (d) => d.targetPosition,
            getColor: [255, 0, 0],
            getWidth: 2,
          }),
        ],
      });

      mapRef.current.addControl(overlay);
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return <div style={{ height: '100vh', width: '100%' }} ref={mapContainerRef}></div>;
};

export default DeckGLMap;
