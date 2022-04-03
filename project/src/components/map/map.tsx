import { useRef, useEffect } from 'react';
import { Location } from '../../types/offers';
import useMap from '../../hooks/useMap';
import leaflet, { Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { Offer } from '../../types/offers';

type MapProps = {
  location: Location
  points: Offer[]
  namePage: 'MainPage' | 'PropertyPage'
  selectedCard?: Offer | null
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ location, points, namePage, selectedCard }: MapProps) {
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
            point.id === selectedCard?.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedCard]);

  return (
    <section className={`${isMainPage ? 'cities__map' : 'property__map'} map`} ref={mapRef}></section>
  );
}

export default Map;
