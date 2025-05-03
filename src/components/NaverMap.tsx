import { useEffect, useRef } from "react";
import { MapContainer } from "../styles/common";

interface NaverMapProps {
  center?: { lat: number; lng: number };
  eduMarkers?: {
    eduId: number;
    lat: number;
    lng: number;
  }[];
  spaceMarkers?: {
    spaceId: string;
    lat: number;
    lng: number;
  }[];
  onEduMarkerClick?: (eduId: number) => void;
  onSpaceMarkerClick?: (spaceId: string) => void;
}

const NaverMap: React.FC<NaverMapProps> = ({
  center = { lat: 37.5665, lng: 126.978 }, // 기본 서울
  eduMarkers = [],
  spaceMarkers = [],
  onEduMarkerClick,
  onSpaceMarkerClick,
}) => {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);

  useEffect(() => {
    const mapElement = document.getElementById("map");
    if (!mapElement || mapRef.current) return;

    const map = new window.naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(center.lat, center.lng),
      zoom: 13,
      minZoom: 11,
    });

    mapRef.current = map;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLoc = new window.naver.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        map.setCenter(userLoc);
      });
    }
  }, []); // 빈 배열 → 최초 1회만 실행

  useEffect(() => {
    if (!mapRef.current) return;

    // 이전 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 교육 마커
    eduMarkers.forEach((markerData) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(markerData.lat, markerData.lng),
        map: mapRef.current!,
      });

      window.naver.maps.Event.addListener(marker, "click", () =>
        onEduMarkerClick?.(markerData.eduId)
      );

      markersRef.current.push(marker);
    });

    // 공간 마커
    spaceMarkers.forEach((markerData) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(markerData.lat, markerData.lng),
        map: mapRef.current!,
      });

      window.naver.maps.Event.addListener(marker, "click", () =>
        onSpaceMarkerClick?.(markerData.spaceId)
      );

      markersRef.current.push(marker);
    });
  }, [eduMarkers, spaceMarkers, onEduMarkerClick]);

  return <MapContainer id="map" />;
};

export default NaverMap;
