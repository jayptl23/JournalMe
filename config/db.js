const mongoose = require('mongoose');

connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

module.exports = connectDB;
