import { useEffect } from "react";
import { MapContainer } from "../styles/common";

interface NaverMapProps {
  center?: { lat: number; lng: number };
}

const NaverMap: React.FC<NaverMapProps> = ({
  center = { lat: 37.5665, lng: 126.978 }, // 기본 서울
}) => {
  useEffect(() => {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    const map = new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(center.lat, center.lng),
      zoom: 15,
      minZoom: 11,
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLoc = new window.naver.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        map.setCenter(userLoc);
      });
    }
  }, [center]);

  return <MapContainer id="map" />;
};

export default NaverMap;
