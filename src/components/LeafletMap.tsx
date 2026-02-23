"use client";

import React, { useEffect, useRef, useMemo } from "react";
import {
  useRecommendTravelDetailStore,
  usePublicTravelDetailStore,
} from "@/store/useRecommendTravelStore";
import { usePathname } from "next/navigation";
import Text from "./Text";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMap: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isDetailPage = pathname === "/travel/detail";

  const recommendItinerary = useRecommendTravelDetailStore(
    (state) => state.itinerary,
  );
  const publicItinerary = usePublicTravelDetailStore(
    (state) => state.itinerary,
  );

  const itinerary = isDetailPage ? recommendItinerary : publicItinerary;

  const colorCycle = useMemo(
    () => [
      "#9A77FF",
      "#7779FF",
      "#77ABFF",
      "#C477FF",
      "#E477FF",
      "#4B0082",
      "#8B00FF",
    ],
    [],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    // 이미 초기화된 맵이 있으면 제거
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    let initialLat = 37.5665;
    let initialLng = 126.978;

    if (itinerary?.dailyScheduleDtos?.length) {
      for (const day of itinerary.dailyScheduleDtos) {
        if (day.attractions.length > 0) {
          const firstAttraction = day.attractions[0];
          if (firstAttraction.latitude && firstAttraction.longitude) {
            initialLat = firstAttraction.latitude;
            initialLng = firstAttraction.longitude;
          }
          break;
        }
      }
    }

    const map = L.map(containerRef.current).setView(
      [initialLat, initialLng],
      14,
    );
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const linePath: L.LatLngExpression[] = [];
    let markerIndex = 1;

    if (itinerary?.dailyScheduleDtos) {
      itinerary.dailyScheduleDtos.forEach((day, dayIndex) => {
        day.attractions.forEach((attraction) => {
          if (attraction.latitude && attraction.longitude) {
            const lat = attraction.latitude;
            const lng = attraction.longitude;
            linePath.push([lat, lng]);

            const color = colorCycle[dayIndex % colorCycle.length];

            const icon = L.divIcon({
              className: "leaflet-custom-marker",
              html: `<div style="
                width: 30px;
                height: 30px;
                background-color: ${color};
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-weight: bold;
                font-size: 14px;
                border: 2px solid white;
                box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
              ">${markerIndex}</div>`,
              iconSize: [30, 30],
              iconAnchor: [15, 15],
            });

            L.marker([lat, lng], { icon })
              .addTo(map)
              .bindPopup(
                `<strong>${attraction.name}</strong><br/>${attraction.address}`,
              );

            markerIndex++;
          }
        });
      });

      if (linePath.length > 1) {
        L.polyline(linePath, {
          color: "#db4040",
          weight: 3,
          opacity: 0.8,
        }).addTo(map);

        map.fitBounds(L.latLngBounds(linePath as L.LatLngExpression[]), {
          padding: [50, 50],
        });
      }
    }

    // 리사이즈 시 맵 갱신
    const handleResize = () => map.invalidateSize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [itinerary, colorCycle]);

  return (
    <>
      <style jsx global>{`
        .leaflet-custom-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </>
  );
};

export default LeafletMap;
