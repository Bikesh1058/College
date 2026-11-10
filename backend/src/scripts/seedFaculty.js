import mongoose from 'mongoose';
import 'dotenv/config';
import { Faculty } from '../models/Faculty.js';
import { facultyMembers } from '../../../frontend/src/data/facultyData.js';

async function seedFaculty() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    console.log('[Seed Faculty] Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('[Seed Faculty] Connected to MongoDB Atlas successfully.');

    console.log(`[Seed Faculty] Clearing existing faculty (${await Faculty.countDocuments()} found)...`);
    await Faculty.deleteMany({});

    console.log(`[Seed Faculty] Inserting ${facultyMembers.length} faculty and staff profiles...`);
    const inserted = await Faculty.insertMany(facultyMembers);
    console.log(`[Seed Faculty] Successfully inserted ${inserted.length} faculty profiles into Atlas!`);

    await mongoose.disconnect();
    console.log('[Seed Faculty] Disconnected cleanly.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Faculty Error]:', error);
    process.exit(1);
  }
}

seedFaculty();

