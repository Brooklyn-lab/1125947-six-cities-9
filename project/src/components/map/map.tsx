import { useRef, useEffect } from 'react';
import { City, Points } from '../../types/points';
import useMap from '../../hooks/useMap';
import leaflet, { Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { URL_MARKER_DEFAULT } from '../../const';

enum MapContainer {
  MainPage = 'cities__map',
  PropertyPage = 'property__map',
}

type MapProps = {
  city: City,
  points: Points[],
  namePage: 'MainPage' | 'PropertyPage'
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ city, points, namePage }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const currentClassName = MapContainer[namePage];

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
    <section className={`${currentClassName} map`} ref={mapRef}></section>
  );
}

export default Map;
