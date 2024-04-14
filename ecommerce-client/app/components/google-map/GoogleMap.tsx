import React, { useRef, useEffect } from "react";

function GoogleMap({ onPlaceSelect }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      const google = window.google;
      console.log(google);
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });

      const marker = new google.maps.Marker({
        map,
        position: { lat: -34.397, lng: 150.644 },
        draggable: true,
      });

      // 마커가 이동할 때 이벤트 처리
      marker.addListener("dragend", (event) => {
        const newPosition = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        onPlaceSelect(newPosition);
      });
    };

    // Google Maps API 스크립트를 로드하는 함수
    const loadScript = (url, callback) => {
      const script = document.createElement("script");
      script.type = "text/javascript";

      if (script.readyState) {
        script.onreadystatechange = function () {
          if (
            script.readyState === "loaded" ||
            script.readyState === "complete"
          ) {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        script.onload = () => callback();
      }

      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    };

    // Google Maps API 스크립트 로드
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyCvJ9GnHRVW_mXaBo5LWaTusOuniFuAE8U&libraries=places`,
      loadMap
    );
  }, [onPlaceSelect]);

  return <div ref={mapRef} style={{ width: "400px", height: "400px" }}></div>;
}

export default GoogleMap;
