// lib/mongoClient.js
import { MongoClient } from 'mongodb'

const uri = 'mongodb+srv://pythoncoding0:DOfy1SA2zYVzgTHi@cluster0.ywvtrbj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

let client
let clientPromise

if (!global._mongoClientPromise) {
  client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

export default clientPromise
