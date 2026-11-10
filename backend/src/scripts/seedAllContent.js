import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {
  NewsArticle,
  Event,
  Research,
  Facility,
  Club,
  DownloadDocument,
  Examination
} from '../models/ExtendedModels.js';
import { Programme } from '../models/Programme.js';
import { Notice } from '../models/Notice.js';
import { Faculty } from '../models/Faculty.js';
import { SiteSettings } from '../models/SiteSettings.js';
import { newsData } from '../../../frontend/src/data/newsData.js';
import { campusLifeData } from '../../../frontend/src/data/campusLifeData.js';
import { researchData } from '../../../frontend/src/data/researchData.js';
import { resourcesData } from '../../../frontend/src/data/resourcesData.js';
import { facultyMembers } from '../../../frontend/src/data/facultyData.js';

dotenv.config();
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/khwopa_db';

const seedAllContent = async () => {
  try {
    await mongoose.connect(uri);
    console.log('[Seed Content] Connected to MongoDB');

    // 1. Seed Academic Streams (4 Real Streams: +2 Science, +2 Management, +2 Humanities, +2 Law)
    await Programme.deleteMany({});
    const realProgrammes = [
      {
        title: '+2 Science',
        slug: 'plus-two-science',
        code: 'SCI-NEB',
        facultyStream: 'Science',
        duration: '2 Years (Grades 11 & 12)',
        affiliatedBody: 'National Examinations Board (NEB)',
        overview: 'Comprehensive secondary science curriculum with Physics, Chemistry, Biology, Mathematics and Computer Science backed by modern wet and digital laboratories.',
        description: 'The +2 Science programme at Khwopa Secondary School offers rigorous theoretical education backed by modern laboratory experimentation in Physics, Chemistry, Biology, and Computer Science.',
        eligibility: 'Minimum GPA 2.4 in SEE with minimum grade C+ in Compulsory Mathematics and Science.',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519828524_e4439fe2-801b-494c-8a2d-a89d2053bc77.png',
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'English', 'Nepali']
      },
      {
        title: '+2 Management',
        slug: 'plus-two-management',
        code: 'MGT-NEB',
        facultyStream: 'Management',
        duration: '2 Years (Grades 11 & 12)',
        affiliatedBody: 'National Examinations Board (NEB)',
        overview: 'Business studies, Accountancy, Economics, Hotel Management, Business Mathematics and Computer Science for future commerce leaders and entrepreneurs.',
        description: 'Designed for future entrepreneurs, chartered accountants, and management professionals, blending foundational business principles with practical accounting, economics, and computing.',
        eligibility: 'Minimum GPA 2.0 in SEE. For Computer/Math combination, minimum grade C+ in Compulsory Mathematics.',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519692269_d079f3e5-f915-4d9a-be18-6e19ced18c2e.png',
        subjects: ['Accountancy', 'Economics', 'Business Studies', 'Hotel Management', 'Computer Science', 'English', 'Nepali']
      },
      {
        title: '+2 Humanities',
        slug: 'plus-two-humanities',
        code: 'HUM-NEB',
        facultyStream: 'Humanities & Law',
        duration: '2 Years (Grades 11 & 12)',
        affiliatedBody: 'National Examinations Board (NEB)',
        overview: 'Sociology, Mass Communication, Political Science, Major English/Nepali and Social Studies fostering social consciousness and public policy inquiry.',
        description: 'The +2 Humanities stream nurtures social awareness, literary appreciation, and civic responsibility through comprehensive study of Sociology, Mass Communication, Political Science, and Languages in historic Bhaktapur.',
        eligibility: 'Minimum GPA 1.6 in SEE.',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-media-images/1751355381420-4ac05be0-9eeb-41ce-a554-074a7a659f79.jpg',
        subjects: ['Sociology', 'Mass Communication', 'Political Science', 'Major English', 'English', 'Nepali']
      },
      {
        title: '+2 Law',
        slug: 'plus-two-law',
        code: 'LAW-NEB',
        facultyStream: 'Humanities & Law',
        duration: '2 Years (Grades 11 & 12)',
        affiliatedBody: 'National Examinations Board (NEB)',
        overview: 'Constitutional Law, Nepalese Legal System, Jurisprudence, Civil & Criminal Law, Legal Drafting and Moot Court advocacy under experienced judicial mentors.',
        description: 'The +2 Law stream provides students with an early, comprehensive foundation in constitutional law, jurisprudence, procedural mechanisms, and legal drafting.',
        eligibility: 'Minimum GPA 2.0 in SEE.',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1781678200024_c36f13dd-8bad-4e5f-a44d-7c98fe64603a.jpg',
        subjects: ['Constitutional Law', 'Nepalese Legal System', 'Procedural Law', 'Jurisprudence', 'Legal Drafting', 'English', 'Nepali']
      }
    ];
    await Programme.insertMany(realProgrammes);
    console.log(`[Seed Content] Inserted ${realProgrammes.length} real academic streams`);

    // 2. Seed Official Notices
    await Notice.deleteMany({});
    const realNotices = [
      {
        title: 'Notice for Class 11 Admission & Municipal Merit Scholarship 2082/2083 Batch',
        slug: 'notice-admission-scholarship-2082-2083',
        category: 'Scholarship',
        content: 'Khwopa Secondary School (undertaken by Bhaktapur Municipality) invites applications for Class 11 admission and full/partial merit scholarships across +2 Science, Management, Humanities, and Law. Students securing top ranks in SEE and entrance examinations are awarded 100% tuition and annual fee waivers.',
        attachment: {
          title: 'Admission & Scholarship Circular 2082/83',
          url: 'https://khwopacollege.edu.np/p/notice-for-admission-scholarship-2082-batch--23659'
        },
        isPinned: true,
        isPublished: true
      },
      {
        title: 'NEB Grade 11 & 12 Annual Board Examination Routine & Center 104 Guidelines',
        slug: 'neb-board-exam-routine-center-104',
        category: 'Examination',
        content: 'The National Examinations Board (NEB), Sanothimi has published the official annual examination schedule for Grade 12 and Grade 11. All examinees assigned to Exam Center Code 104 (Khwopa Secondary School, Dekocha) must report 30 minutes prior to commencement with original NEB Admit Card and College ID.',
        attachment: {
          title: 'NEB Official Exam Routine',
          url: 'https://neb.gov.np/notices'
        },
        isPinned: true,
        isPublished: true
      },
      {
        title: 'NEB Registration & Exam Application Form Submission Notice (Regular & Partial)',
        slug: 'neb-registration-exam-form-submission-notice',
        category: 'Examination',
        content: 'All Grade 11 and Grade 12 students are notified to complete their NEB registration and board examination application forms at the Examination Administration Desk (Block B) along with SEE grade-sheet copies and bank voucher clearance.',
        attachment: {
          title: 'NEB Form Guidelines',
          url: '/examinations/forms'
        },
        isPinned: false,
        isPublished: true
      },
      {
        title: 'Annual Cultural Gala, Heritage Exhibition & Foundation Day Celebration',
        slug: 'annual-cultural-gala-foundation-day-notice',
        category: 'Event',
        content: 'On the occasion of the Institutional Foundation Day, the Literature & Cultural Forum is organizing a traditional Newari cultural exhibition, poetry symposium, and academic medal distribution ceremony at the Dekocha main courtyard.',
        attachment: {
          title: 'Cultural Program Archive',
          url: 'https://khwopacollege.edu.np/p/cultural-program-16466'
        },
        isPinned: false,
        isPublished: true
      },
      {
        title: 'Academic Calendar & Institutional Holiday Notification',
        slug: 'academic-calendar-holiday-notification',
        category: 'General',
        content: 'All faculty members, administrative staff, and students are informed to follow the published academic calendar for terminal tests, practical lab evaluations, and gazetted public holidays.',
        attachment: {
          title: 'Academic Calendar',
          url: '/resources/calendar'
        },
        isPinned: false,
        isPublished: true
      }
    ];
    await Notice.insertMany(realNotices);
    console.log(`[Seed Content] Inserted ${realNotices.length} official notices`);

    // 3. Seed News Articles
    await NewsArticle.deleteMany({});
    const newsToInsert = (newsData || []).map((n, idx) => ({
      title: n.title,
      slug: n.slug,
      category: n.category || 'Academic',
      date: n.date || 'Recently Published',
      readTime: n.readTime || '3 min read',
      image: n.image || '',
      excerpt: n.summary || (Array.isArray(n.content) ? n.content[0] : n.content) || n.title,
      content: Array.isArray(n.content) ? n.content.join('\n\n') : (n.content || n.summary || ''),
      isFeatured: idx === 0
    }));
    await NewsArticle.insertMany(newsToInsert);
    console.log(`[Seed Content] Inserted ${newsToInsert.length} news articles`);

    // 4. Seed Events
    await Event.deleteMany({});
    const eventsToInsert = (campusLifeData.events || []).map((e, idx) => ({
      title: e.title,
      slug: e.slug || `event-${idx + 1}`,
      date: e.date || 'Upcoming 2083',
      time: e.time || '10:00 AM - 3:00 PM',
      location: e.location || 'Khwopa College Auditorium, Dekocha',
      category: e.category || 'Academic',
      description: e.description || e.desc || e.summary || e.title,
      image: e.image || 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1678958957817_007be5e2-a1dc-4580-9809-4964d79fa1a0.jpg',
      isUpcoming: true
    }));
    await Event.insertMany(eventsToInsert);
    console.log(`[Seed Content] Inserted ${eventsToInsert.length} campus events`);

    // 5. Seed Student Clubs (8 Real Khwopa Student Chapters & Societies)
    await Club.deleteMany({});
    const realClubs = [
      {
        name: 'Khwopa IT & Coding Club',
        slug: 'khwopa-it-coding-club',
        category: 'Technology',
        lead: 'President: Aayush Prajapati (Grade 12)',
        members: '120+ Active Members',
        description: 'Organizes annual intra-college hackathons, Linux & Git hands-on workshops, competitive programming bootcamps, and web development challenges.',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519692269_d079f3e5-f915-4d9a-be18-6e19ced18c2e.png',
        activities: 'Annual Intra-College Hackathon, Linux & Git Hands-on Sessions, Competitive Programming League'
      },
      {
        name: 'Khwopa Management Association (KMA)',
        slug: 'khwopa-management-association',
        category: 'Business & Leadership',
        lead: 'President: Rupa Suwal (Grade 12)',
        members: '180+ Active Members',
        description: 'Empowers commerce and management students through stock market simulations, national budget round-tables, entrepreneurship pitches, and business quizzes.',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519256049_2fd51e0f-5475-44e2-b639-f263e727722f.jpg',
        activities: 'Khwopa Management Fest, Live Stock Trading Simulation, Youth Entrepreneurship Pitch'
      },
      {
        name: 'Youth Red Cross Circle (YRCC) Khwopa',
        slug: 'youth-red-cross-circle-khwopa',
        category: 'Humanitarian & Social Service',
        lead: 'Coordinator: Bikash Shrestha (Grade 12)',
        members: '250+ Volunteers',
        description: 'Carries forward community health drives, voluntary blood donation camps in collaboration with NRCS Bhaktapur, disaster risk training, and first-aid response.',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-media-images/1751355381816-426846d5-93df-4761-989c-21986cfc2034.jpg',
        activities: 'Quarterly Blood Donation Camp, Earthquake Preparedness Drills, Community Health Checkups'
      },
      {
        name: 'Literature & Cultural Forum',
        slug: 'literature-cultural-forum',
        category: 'Culture & Arts',
        lead: 'Coordinator: Sushma Joshi (Grade 12)',
        members: '95+ Enthusiasts',
        description: 'Celebrates Nepal Bhasa, Nepali and English poetry slams, traditional Newari musical workshops, theater productions, and inter-college debate championships.',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-media-images/1751352979401-f3d040cd-1ff9-43a5-87c8-4e2859c53345.jpg',
        activities: 'Kavya Sandhya Poetry Evenings, Inter-College Debate Tournaments, Biska Jatra Cultural Documentation'
      },
      {
        name: 'Khwopa Environment & Heritage Eco Circle',
        slug: 'khwopa-environment-eco-circle',
        category: 'Environment',
        lead: 'President: Prakash Duwal (Grade 12)',
        members: '110+ Stewards',
        description: 'Fosters environmental stewardship, waste segregation campaigns, traditional stone water-spout (Hiti) cleanups, and tree plantation drives across Bhaktapur.',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-media-images/1751354678228-f22745f6-6237-430d-a51e-8e20b95dbfcd.jpg',
        activities: 'Heritage Pond & Hiti Cleanups, Tree Plantation at Changunarayan, Zero Plastic Campus Drive'
      },
      {
        name: 'Khwopa Science & Robotics Society',
        slug: 'khwopa-science-robotics-society',
        category: 'Technology',
        lead: 'Coordinator: Suman Bekoju (Grade 12)',
        members: '140+ Innovators',
        description: 'Designs microcontroller prototypes, hydraulic models, botanical specimens, and automated IoT systems for the annual Khwopa Science Exhibition.',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519828524_e4439fe2-801b-494c-8a2d-a89d2053bc77.png',
        activities: 'Annual Science & Engineering Expo, Arduino & IoT Bootcamps, Astronomy Night Sky Observation'
      },
      {
        name: 'Khwopa Moot Court & Law Society',
        slug: 'khwopa-moot-court-law-society',
        category: 'Business & Leadership',
        lead: 'Coordinator: Sandhya Karmacharya (Grade 12)',
        members: '85+ Legal Scholars',
        description: 'Conducts simulated trial advocacy, constitutional law debates, legal drafting clinics, and parliamentary procedures for +2 Law and Humanities students.',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1781678200024_c36f13dd-8bad-4e5f-a44d-7c98fe64603a.jpg',
        activities: 'Intra-College Moot Court Competition, Constitutional Rights Symposium, Supreme Court Observation Visits'
      },
      {
        name: 'Khwopa Sports & Athletics Council',
        slug: 'khwopa-sports-athletics-council',
        category: 'Culture & Arts',
        lead: 'Captain: Dipesh Twanabasu (Grade 12)',
        members: '200+ Athletes',
        description: 'Coordinates the flagship Winter Sports Week including inter-stream football, basketball, volleyball, ITTF table tennis, athletics relays, and chess masters.',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-media-images/1751354678034-37421fd3-9033-4750-a31f-0270f477c4d0.jpg',
        activities: 'Annual Sports Gala, Mayor Cup Inter-College Basketball, Intra-College Table Tennis & Chess Championship'
      }
    ];
    await Club.insertMany(realClubs);
    console.log(`[Seed Content] Inserted ${realClubs.length} student clubs`);

    // 6. Seed Examinations & NEB Schedules
    await Examination.deleteMany({});
    const realExaminations = [
      {
        title: 'Final Schedule – NEB Grade 12 Annual Board Examination 2083',
        examDate: 'Starts Baisakh 14, 2083',
        status: 'Routine Published',
        center: 'Center 104 (Khwopa, Dekocha)',
        gradeLevel: '+2 Science, Management, Humanities & Law',
        routineImage: 'https://neb.gov.np',
        description: 'Official National Examinations Board (NEB) annual timetable for Grade 12 regular and partial examinees.'
      },
      {
        title: 'Routine – NEB Grade 11 Annual Examination & Practical Evaluation 2083',
        examDate: 'Starts Jestha 08, 2083',
        status: 'Admit Cards Ready',
        center: 'Khwopa Academic Blocks B & C',
        gradeLevel: '+2 Science & Management',
        routineImage: 'https://neb.gov.np',
        description: 'Annual theory and laboratory practical viva-voce schedule for Grade 11 students across all faculties.'
      },
      {
        title: 'Revised Routine – Grade 12 Supplementary (Grade Increment) Exam',
        examDate: 'Starts Ashwin 22, 2082',
        status: 'Routine Published',
        center: 'Center 104 (Khwopa)',
        gradeLevel: '+2 All Streams',
        routineImage: 'https://neb.gov.np',
        description: 'Supplementary board examination schedule published by NEB Sanothimi for Grade 12 grade increment candidates.'
      },
      {
        title: 'Second Terminal & Pre-Board Qualifying Examination',
        examDate: 'Starts Poush 25, 2082',
        status: 'Upcoming',
        center: 'All Campus Examination Halls',
        gradeLevel: '+2 Science, Management, Law & Humanities',
        routineImage: '/examinations/routines',
        description: 'Internal terminal assessment and pre-board qualifying examinations conducted by the Khwopa Examination Committee.'
      }
    ];
    await Examination.insertMany(realExaminations);
    console.log(`[Seed Content] Inserted ${realExaminations.length} examination schedules`);

    // 7. Seed Research Publications (RMC & NepJOL Indexed)
    await Research.deleteMany({});
    const realResearch = [
      ...(researchData.publications || []).map((r, idx) => ({
        title: r.title,
        slug: r.slug || `pub-${idx + 1}`,
        author: r.authors || r.author || 'Khwopa Faculty & Research Cell',
        journal: r.journal || 'Khwopa Journal (ISSN: 2091-0371)',
        year: r.year || '2082/2083',
        department: r.department || 'Research Management Cell (RMC)',
        abstract: r.abstract || r.description || r.summary || r.title,
        pdfUrl: 'https://www.nepjol.info',
        category: r.category || 'Economics & Governance'
      })),
      {
        title: 'Khwopa Journal Vol. VIII (Bi-Annual Peer-Reviewed Multi-Disciplinary Issue)',
        slug: 'khwopa-journal-vol-8-nepjol',
        author: 'Prof. Dr. Chandra Bahadur Shrestha & RMC Editorial Board',
        journal: 'Khwopa Journal (ISSN: 2091-0371 Print / 2738-9847 Online)',
        year: '2082/2083 Issue',
        department: 'Research Management Cell (RMC)',
        abstract: 'Peer-reviewed multi-disciplinary journal indexed on Nepal Journals Online (NepJOL) featuring empirical studies on Bhaktapur heritage economics, urban hydrology, and social governance.',
        pdfUrl: 'https://www.nepjol.info',
        category: 'Economics & Governance'
      },
      {
        title: 'Physiochemical & Microbiological Water Quality of Traditional Stone Spouts (Hiti) in Bhaktapur',
        slug: 'water-quality-traditional-hiti-bhaktapur',
        author: 'Dr. Raju Bhai Tyata & Dept. of Physics / Environmental Science',
        journal: 'Khwopa Journal of Applied Sciences',
        year: '2082',
        department: 'Department of Science & R&D Unit',
        abstract: 'Empirical evaluation of potable groundwater safety, aquifer recharge dynamics, and indigenous filtration stone conduits across historic Bhaktapur neighborhoods.',
        pdfUrl: 'https://www.nepjol.info',
        category: 'Environmental Science'
      }
    ];
    await Research.insertMany(realResearch);
    console.log(`[Seed Content] Inserted ${realResearch.length} research publications`);

    // 8. Seed Downloadable Documents & Syllabi
    await DownloadDocument.deleteMany({});
    const realDocuments = (resourcesData.downloads || []).map((d) => ({
      title: d.title,
      category: d.category || 'Syllabus',
      fileSize: `${d.fileSize} ${d.fileType || 'PDF'}`,
      fileUrl: 'https://neb.gov.np',
      academicYear: d.date || '2082/2083',
      description: d.description
    }));
    await DownloadDocument.insertMany(realDocuments);
    console.log(`[Seed Content] Inserted ${realDocuments.length} downloadable documents & syllabi`);

    // 9. Seed Campus Media & Library Facilities
    await Facility.deleteMany({});
    const realFacilities = [
      {
        number: '01',
        title: 'Khwopa Central Library & OPAC Circulation Counter',
        category: 'Library',
        image: 'https://khwopa.edu.np/themes/khce_v2/images/Library_Section_2082.png',
        badge: '45,000+ Volumes',
        description: 'Official Khwopa institutional library issuing section, automated OPAC cataloging terminals, and reference desk.',
        summary: 'Central Library Circulation & OPAC'
      },
      {
        number: '02',
        title: 'Dekocha Central Academic Block & Library Hall',
        category: 'Campus',
        image: 'https://management.khwopaconference.com/themes/management_conf/img/kc.jpg',
        badge: 'Dekocha Campus',
        description: 'Traditional Newar red-brick architectural facade and central academic courtyard at Khwopa College in Dekocha, Bhaktapur.',
        summary: 'Historic Brick Facade & Main Courtyard'
      },
      {
        number: '03',
        title: 'Khwopa Reference & Quiet Reading Sanctuary',
        category: 'Library',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1644813717332_afd87d30-4d2b-4785-9582-006372b42071.jpg',
        badge: '180 Reading Seats',
        description: 'Spacious study halls and reference bookshelves utilized daily by +2 Science, Management, Humanities, and Law students.',
        summary: 'Reference & Periodicals Reading Hall'
      },
      {
        number: '04',
        title: 'Physics, Chemistry & Biology Wet Laboratories',
        category: 'Laboratory',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519828524_e4439fe2-801b-494c-8a2d-a89d2053bc77.png',
        badge: 'NEB Practical Labs',
        description: 'Modern scientific apparatus and dedicated laboratory stations supporting weekly 3-hour experimental rotations for Grade 11 and 12.',
        summary: 'Science Practical Wet Laboratories'
      },
      {
        number: '05',
        title: 'Digital Research & Computer Science Workstation Lab',
        category: 'Laboratory',
        image: 'https://wms.edigitalnepal.com/wms/files/ws-post-images/1751519692269_d079f3e5-f915-4d9a-be18-6e19ced18c2e.png',
        badge: 'High-Speed Fiber & Backup',
        description: 'High-speed networked computer terminals for C programming, web technology, database management, and digital OPAC research.',
        summary: 'Computer Science & E-Library Stations'
      },
      {
        number: '06',
        title: 'Khwopa Integrated Educational Complex',
        category: 'Campus',
        image: 'https://khwopa.edu.np/themes/khce_v2/images/KhEC_KhCE.jpg',
        badge: 'Bhaktapur Municipality',
        description: 'Panoramic view of the unified Khwopa educational complex undertaken by Bhaktapur Municipality.',
        summary: 'Unified Campus Complex'
      }
    ];
    await Facility.insertMany(realFacilities);
    console.log(`[Seed Content] Inserted ${realFacilities.length} campus & library media assets`);

    // 10. Ensure Faculty is seeded if empty
    const facultyCount = await Faculty.countDocuments();
    if (facultyCount === 0) {
      await Faculty.insertMany(facultyMembers);
      console.log(`[Seed Content] Inserted ${facultyMembers.length} real faculty members`);
    } else {
      console.log(`[Seed Content] Faculty collection already contains ${facultyCount} educators`);
    }

    // 11. Ensure SiteSettings is seeded with real Khwopa information & module badges
    let settings = await SiteSettings.findOne();
    if (!settings) {
      await SiteSettings.create({
        collegeName: 'Khwopa Secondary School (+2)',
        tagline: 'An Undertaking of Bhaktapur Municipality · Dedicated to Country and People',
        establishedYearBS: '2056 BS',
        establishedYearAD: '1999 AD',
        address: 'Dekocha-6, Bhaktapur, Nepal',
        phone: '+977-1-6614336, 01-6610932',
        email: 'info@khwopacollege.edu.np',
        socialLinks: {
          facebook: 'https://www.facebook.com/KhwopaSecondarySchool',
          youtube: 'https://www.youtube.com'
        },
        moduleBadges: {
          academics: '4',
          examinations: 'Code 104',
          faculty: '116',
          campuslife: '8',
          research: 'NepJOL',
          resources: '6 Docs'
        }
      });
      console.log('[Seed Content] SiteSettings initialized');
    }

    console.log('[All Real Khwopa Collections Successfully Seeded into MongoDB!]');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

seedAllContent();
