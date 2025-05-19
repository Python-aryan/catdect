"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { Cat, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import DetectionFeed from "@/components/detection-feed"
import DetectionChart from "@/components/detection-chart"
import { mockDetections } from "@/lib/mock-data"

interface Detection {
  label: string;
  confidence: number;
  timestamp: string; // or Date if you're parsing it as a Date object
  imageUrl: string;
  location?: string;
}

export default function Dashboard() {
  const [detections, setDetections] = useState<Detection[]>(mockDetections)
  const [isConnected, setIsConnected] = useState(false)

  const [stats, setStats] = useState({
    total: mockDetections.length,
    today: mockDetections.filter((d) => {
      const today = new Date()
      const detectionDate = new Date(d.timestamp)
      return (
        detectionDate.getDate() === today.getDate() &&
        detectionDate.getMonth() === today.getMonth() &&
        detectionDate.getFullYear() === today.getFullYear()
      )
    }).length,
    lastHour: mockDetections.filter((d) => {
      const now = new Date()
      const detectionDate = new Date(d.timestamp)
      return now.getTime() - detectionDate.getTime() < 3600000
    }).length,
  })

  useEffect(() => {
    const fetchDetections = async () => {
      try {
        const res = await fetch('/api/detections')
        const data = await res.json();
        setDetections(data);
      } catch (err) {
        console.error("Failed to fetch detections", err);
      }
    };

    fetchDetections();
    const interval = setInterval(fetchDetections, 10000); // Auto-refresh every 10s
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Cat className="h-6 w-6" />
          <h1 className="text-lg font-semibold">Cat Detection Dashboard</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {isConnected ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex gap-2 items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Live
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex gap-2 items-center">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              Offline
            </Badge>
          )}
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Detections</CardTitle>
              <Cat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time cat detections</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today}</div>
              <p className="text-xs text-muted-foreground">Detections in the last 24 hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Last Hour</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.lastHour}</div>
              <p className="text-xs text-muted-foreground">Recent detection activity</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="md:col-span-2 lg:col-span-4">
            <CardHeader>
              <CardTitle>Detection Trend</CardTitle>
              <CardDescription>Cat detection activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <DetectionChart detections={detections} />
            </CardContent>
          </Card>
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Detections</CardTitle>
              <CardDescription>Live feed of cat detections</CardDescription>
            </CardHeader>
            <CardContent>
              <DetectionFeed detections={detections} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
