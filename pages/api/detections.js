// pages/api/detections.js
import clientPromise from '@/lib/mongoClient'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db('cat_detector')
    const collection = db.collection('collection')

    if (req.method === 'GET') {
      const detections = await collection.find({}).sort({ timestamp: -1 }).toArray()
      res.status(200).json(detections)

    } else if (req.method === 'POST') {
      const { label = 'cat', confidence, timestamp = new Date(), imageUrl, location = 'Camera 1' } = req.body

      if (!confidence || !imageUrl) {
        return res.status(400).json({ message: 'Missing required fields: confidence, imageUrl' })
      }

      const result = await collection.insertOne({
        label,
        confidence: parseFloat(confidence),
        timestamp: new Date(timestamp),
        imageUrl,
        location,
      })

      res.status(201).json({ message: 'Detection logged', id: result.insertedId })
    }

    else {
      res.status(405).json({ message: 'Method Not Allowed' })
    }

  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ message: 'Internal Server Error', error })
  }
}
