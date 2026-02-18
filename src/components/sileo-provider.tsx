"use client";

import { Toaster } from "sileo";

export function SileoProvider() {
  return (
    <Toaster
      position="top-right"
      offset={14}
      options={{
        fill: "#ffffff",
        roundness: 14,
        duration: 4200,
        autopilot: { expand: 260, collapse: 180 },
        styles: {
          title: "sileo-title",
          description: "sileo-description",
          button: "sileo-button",
          badge: "sileo-badge",
        },
      }}
    />
  );
}
