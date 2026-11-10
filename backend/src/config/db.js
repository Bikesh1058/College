import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/khwopa_db';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      heartbeatFrequencyMS: 10000
    });
    console.log(`[MongoDB Connected] Host: ${conn.connection.host} | DB: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error] Failed to connect to ${uri}: ${error.message}`);
    console.error('[MongoDB Notice] Ensure your IP address is whitelisted in MongoDB Atlas Network Access.');
  }

  mongoose.connection.on('disconnected', () => {
    console.warn('[MongoDB Warning] Disconnected from database. Attempting reconnect...');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('[MongoDB Reconnected] Connection re-established.');
  });
};

