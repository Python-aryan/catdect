import type { Detection } from "./types"

// Generate timestamps for the last 24 hours
const generatePastTimestamps = (count: number) => {
  const timestamps = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const pastTime = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000)
    timestamps.push(pastTime.toISOString())
  }

  return timestamps.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
}

const timestamps = generatePastTimestamps(15)

export const mockDetections: Detection[] = timestamps.map((timestamp, index) => ({
  id: `detection-${index}`,
  timestamp,
  imageUrl: `/placeholder.svg?height=300&width=400`,
  location: `Camera ${Math.floor(Math.random() * 5) + 1}`,
  confidence: Math.round(Math.random() * 30 + 70) / 100,
}))
