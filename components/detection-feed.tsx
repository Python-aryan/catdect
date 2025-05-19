"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin } from "lucide-react"
import type { Detection } from "@/lib/types"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface DetectionFeedProps {
  detections: Detection[]
}

export default function DetectionFeed({ detections }: DetectionFeedProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null)

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {detections.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-muted-foreground">
            No detections yet
          </div>
        ) : (
          detections.map((detection) => (
            <div
              key={detection.timestamp}
              className="flex flex-col gap-2 rounded-lg border p-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">Cat Detected</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {detection.location}
                  </div>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {Math.round(detection.confidence * 100)}% confidence
                </Badge>
              </div>

              {detection.imageUrl && (
                <div
                  className="relative cursor-pointer overflow-hidden rounded-md"
                  onClick={() =>
                    setExpandedImage(expandedImage === detection.imageUrl ? null : detection.imageUrl)
                  }
                >
                  <Image
                    src={detection.imageUrl}
                    alt="Cat detection"
                    width={350}
                    height={350}
                    className="rounded-md object-cover transition-all duration-300"
                  />
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                {format(new Date(detection.timestamp), "dd MMM yyyy, hh:mm a")}
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  )
}
