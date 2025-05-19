// test-mongo.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pythoncoding0:DOfy1SA2zYVzgTHi@cluster0.ywvtrbj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  process.exit(0);
})
.catch(err => {
  console.error('❌ Failed to connect:', err.message);
  process.exit(1);
});
