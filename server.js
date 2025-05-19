const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Detection = require('./models/Detection');

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/cat_detector/detections', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/api/detections', async (req, res) => {
  try {
    const detections = await Detection.find().sort({ timestamp: -1 });
    res.json(detections);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
