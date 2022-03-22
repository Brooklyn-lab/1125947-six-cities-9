import { useRef, useEffect } from 'react';
import { City, Points } from '../../types/points';
import useMap from '../../hooks/useMap';
import leaflet, { Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { URL_MARKER_DEFAULT } from '../../const';

type MapProps = {
  city: City,
  points: Points[]
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ city, points }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng,
        });
        marker
          .setIcon(
            defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, city]);

  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

export default Map;
