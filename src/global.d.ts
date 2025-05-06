declare namespace naver {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number);
    }

    class Map {
      constructor(
        element: string | HTMLElement,
        options: {
          center: LatLng;
          zoom?: number;
          minZoom?: number;
        }
      );
      setCenter(latlng: LatLng): void;
    }

    class Marker {
      constructor(options: { position: LatLng; map: Map | null });
      setMap(map: Map | null): void;
    }

    namespace Event {
      function addListener(
        instance: any,
        eventName: string,
        listener: (...args: any[]) => void
      ): void;
    }
  }
}
