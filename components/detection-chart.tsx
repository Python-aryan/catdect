"use client"

import { useMemo } from "react"
import { subHours, format, startOfHour, addHours } from "date-fns"
import type { Detection } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

interface DetectionChartProps {
  detections: Detection[]
}

export default function DetectionChart({ detections }: { detections: Detection[] }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {detections.map((detection, index) => (
        <div key={index} className="p-4 border rounded-md shadow-sm">
          <p><strong>Detected:</strong> {detection.location}</p>
          <p><strong>Time:</strong>
                {format(new Date(detection.timestamp), "dd MMM yyyy, hh:mm a")}</p>
          {/* {detection.imageUrl && (
            <img
              src={detection.imageUrl}
              alt="Detected cat"
              className="mt-2 w-48 rounded-md"
            />
          )} */}
        </div>
      ))}
    </div>
  );
}
