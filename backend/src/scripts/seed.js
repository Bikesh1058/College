import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Faculty } from '../models/Faculty.js';
import { Page } from '../models/Page.js';
import { Programme } from '../models/Programme.js';
import { Notice } from '../models/Notice.js';
import { User } from '../models/User.js';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/khwopa_db';

const seedDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log('[Seed] Connected to MongoDB:', uri);

    // 1. Create Default Super Admin & Principal CMS accounts
    await User.deleteMany({});
    await User.create([
      {
        name: 'Khwopa Super Administrator',
        email: 'admin@khwopa.edu.np',
        password: 'AdminPassword2026!',
        role: 'Super Admin',
        department: 'ICT & Executive Administration'
      },
      {
        name: 'Principal Prakash Kumar Shrestha',
        email: 'principal@khwopa.edu.np',
        password: 'PrincipalPassword2026!',
        role: 'Principal / Approver',
        department: 'College Leadership'
      }
    ]);
    console.log('[Seed] Admin & Principal accounts created successfully');

    // 2. Seed Universal Page: About Khwopa
    await Page.deleteMany({});
    await Page.create({
      title: 'About Khwopa Secondary School',
      slug: 'about',
      pageType: 'about',
      status: 'published',
      seo: {
        title: 'About Us · Khwopa Secondary School (+2)',
        description: 'An undertaking of Bhaktapur Municipality offering +2 education in Science, Management, Humanities, and Law.'
      },
      sections: [
        {
          type: 'hero',
          order: 1,
          enabled: true,
          content: {
            eyebrow: 'About Khwopa Secondary School',
            heading: 'Community-guided higher secondary education in Bhaktapur.',
            description: 'Established under the visionary leadership of Bhaktapur Municipality, Khwopa Secondary School (+2) provides accessible, rigorous academic training across Science, Management, Humanities, and Law.',
            bannerImage: 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1751512628392_35a0f113-7f94-43bb-9bf6-4a2d56daf8d6.jpg'
          }
        },
        {
          type: 'statistics',
          order: 2,
          enabled: true,
          content: {
            stats: [
              { value: '2058 BS', label: 'Established (2001 AD)' },
              { value: '116+', label: 'Faculty Members' },
              { value: '4', label: 'Core Faculties' },
              { value: '100%', label: 'NEB Affiliated' }
            ]
          }
        }
      ]
    });
    console.log('[Seed] About Page created successfully');

    // 3. Seed Core Programmes
    await Programme.deleteMany({});
    await Programme.create([
      {
        title: '+2 Science',
        slug: 'plus-two-science',
        facultyStream: 'Science',
        overview: 'Rigorous foundation in Physics, Chemistry, Biology, Mathematics and Computer Science.',
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English', 'Nepali']
      },
      {
        title: '+2 Management',
        slug: 'plus-two-management',
        facultyStream: 'Management',
        overview: 'Grounding in Business, Accountancy, Economics, Hotel Management and Computer Science.',
        subjects: ['Accountancy', 'Economics', 'Business Studies', 'Hotel Management', 'Computer Science', 'English', 'Nepali']
      },
      {
        title: '+2 Humanities & Law',
        slug: 'plus-two-humanities-law',
        facultyStream: 'Humanities & Law',
        overview: 'Critical consciousness in Jurisprudence, Sociology, Mass Communication and Literature.',
        subjects: ['Constitutional Law', 'Nepalese Legal System', 'Sociology', 'Mass Communication', 'English', 'Nepali']
      }
    ]);
    console.log('[Seed] Core academic programmes created successfully');

    console.log('[Seed Completed Successfully]');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

seedDatabase();

