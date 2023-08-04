// db.js
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    // Replace 'mongodb://localhost:27017/mydatabase' with your MongoDB connection string
    await mongoose.connect('mongodb+srv://as3662119:Ayesha24@cluster0.yfubvz4.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB database!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectToDatabase;