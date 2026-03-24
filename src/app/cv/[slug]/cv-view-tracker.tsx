"use client";

import { useEffect } from "react";
import { UAParser } from "ua-parser-js";

interface CvViewTrackerProps {
  cvId: string;
}

export default function CvViewTracker({ cvId }: CvViewTrackerProps) {
  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    const deviceType = result.device.type || "desktop";

    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cvId,
        device: deviceType,
        referer: document.referrer || null,
      }),
    }).catch(() => {});
  }, [cvId]);

  return null;
}
