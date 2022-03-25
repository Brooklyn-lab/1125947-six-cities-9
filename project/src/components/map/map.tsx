import { useRef, useEffect } from 'react';
import { Location } from '../../types/points';
import useMap from '../../hooks/useMap';
import leaflet, { Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { URL_MARKER_DEFAULT } from '../../const';
import { Offer } from '../../types/offers';

type MapProps = {
  location: Location
  points: Offer[]
  selectedPoint?: Offer | undefined
  namePage: 'MainPage' | 'PropertyPage'
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ location, points, selectedPoint, namePage }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  const isMainPage = namePage === 'MainPage';

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });
        marker
          .setIcon(
            defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, location, points, selectedPoint]);

  return (
    <section className={`${isMainPage ? 'cities__map' : 'property__map'} map`} ref={mapRef}></section>
  );
}

export default Map;
