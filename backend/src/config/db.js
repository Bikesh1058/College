import mongoose from 'mongoose';

export const connectDB = async () => {
  let uri = process.env.MONGODB_URI;

  // Support separate credentials if provided via environment
  if ((!uri || uri.includes('<DB_PASSWORD>') || uri.includes('<password>')) && process.env.DB_PASSWORD) {
    const user = process.env.DB_USER || 'bikesh1058_db_user';
    const cluster = process.env.DB_CLUSTER || 'cluster0.vlionkk.mongodb.net';
    const dbName = process.env.DB_NAME || 'khwopa_db';
    uri = `mongodb+srv://${user}:${encodeURIComponent(process.env.DB_PASSWORD)}@${cluster}/${dbName}?retryWrites=true&w=majority`;
  }

  if (uri && (uri.includes('<DB_PASSWORD>') || uri.includes('<password>'))) {
    console.warn('[MongoDB Notice] Placeholder credentials detected in MONGODB_URI. Supply credentials via environment variables.');
    return;
  }

  uri = uri || 'mongodb://localhost:27017/khwopa_db';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      heartbeatFrequencyMS: 10000
    });
    console.log(`[MongoDB Connected] Host: ${conn.connection.host} | DB: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error] Failed to connect: ${error.message}`);
    console.error('[MongoDB Notice] Ensure your IP address is whitelisted in MongoDB Atlas Network Access.');
  }

  mongoose.connection.on('disconnected', () => {
    console.warn('[MongoDB Warning] Disconnected from database. Attempting reconnect...');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('[MongoDB Reconnected] Connection re-established.');
  });
};

