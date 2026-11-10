import { NewsArticle, Event, Research, Facility, Club, DownloadDocument, Examination, Subscriber } from '../models/ExtendedModels.js';
import { User } from '../models/User.js';
import { sendAdmissionEmail } from '../utils/emailService.js';

// News Controller
export const getNews = async (req, res) => {
  try {
    const news = await NewsArticle.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: news.length, data: news });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const news = await NewsArticle.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: news });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const article = await NewsArticle.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });
    res.status(200).json({ success: true, message: 'News article deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Events Controller
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const event = await Event.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Research Controller
export const getResearch = async (req, res) => {
  try {
    const research = await Research.find().sort({ year: -1 });
    res.status(200).json({ success: true, count: research.length, data: research });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createResearch = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const research = await Research.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: research });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateResearch = async (req, res) => {
  try {
    const research = await Research.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!research) return res.status(404).json({ success: false, message: 'Research item not found' });
    res.status(200).json({ success: true, data: research });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteResearch = async (req, res) => {
  try {
    const research = await Research.findByIdAndDelete(req.params.id);
    if (!research) return res.status(404).json({ success: false, message: 'Research item not found' });
    res.status(200).json({ success: true, message: 'Research publication deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Facilities Controller
export const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: facilities.length, data: facilities });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createFacility = async (req, res) => {
  try {
    const facility = await Facility.create(req.body);
    res.status(201).json({ success: true, data: facility });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!facility) return res.status(404).json({ success: false, message: 'Media asset not found' });
    res.status(200).json({ success: true, data: facility });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    if (!facility) return res.status(404).json({ success: false, message: 'Facility not found' });
    res.status(200).json({ success: true, message: 'Facility deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Clubs Controller
export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: clubs.length, data: clubs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createClub = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const club = await Club.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: club });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!club) return res.status(404).json({ success: false, message: 'Club not found' });
    res.status(200).json({ success: true, data: club });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) return res.status(404).json({ success: false, message: 'Club not found' });
    res.status(200).json({ success: true, message: 'Club deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Downloads / Documents Controller
export const getDocuments = async (req, res) => {
  try {
    const docs = await DownloadDocument.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: docs.length, data: docs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createDocument = async (req, res) => {
  try {
    const doc = await DownloadDocument.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const doc = await DownloadDocument.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
    res.status(200).json({ success: true, data: doc });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const doc = await DownloadDocument.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
    res.status(200).json({ success: true, message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Examinations Controller
export const getExaminations = async (req, res) => {
  try {
    const exams = await Examination.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: exams.length, data: exams });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createExamination = async (req, res) => {
  try {
    const exam = await Examination.create(req.body);
    res.status(201).json({ success: true, data: exam });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateExamination = async (req, res) => {
  try {
    const exam = await Examination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!exam) return res.status(404).json({ success: false, message: 'Examination schedule not found' });
    res.status(200).json({ success: true, data: exam });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteExamination = async (req, res) => {
  try {
    const exam = await Examination.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ success: false, message: 'Examination schedule not found' });
    res.status(200).json({ success: true, message: 'Examination schedule deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Team Users / RBAC Controller
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }
    const user = await User.create({
      name,
      email,
      password: password || 'Khwopa@123',
      role: role || 'News Editor',
      department: department || 'Administration'
    });
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        isActive: user.isActive
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'Administrator account removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Newsletter Subscription Controller
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if already subscribed
    let subscriber = await Subscriber.findOne({ email: normalizedEmail });
    const isNewSubscriber = !subscriber;

    if (!subscriber) {
      subscriber = await Subscriber.create({ email: normalizedEmail });
    } else if (subscriber.status === 'unsubscribed') {
      subscriber.status = 'active';
      await subscriber.save();
    }

    // Send confirmation email
    const subject = 'Welcome to Khwopa Secondary School Updates & Announcements';
    const htmlContent = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e3dccb; border-radius: 12px; background-color: #fbfaf6; color: #101b2d;">
        <div style="text-align: center; border-bottom: 2px solid #c5a15b; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #101b2d; font-size: 24px; letter-spacing: 1px;">KHWOPA SECONDARY SCHOOL</h2>
          <p style="margin: 4px 0 0 0; color: #a68238; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">An Undertaking of Bhaktapur Municipality</p>
        </div>
        <p style="font-size: 16px; line-height: 1.6;">Dear Subscriber,</p>
        <p style="font-size: 15px; line-height: 1.7; color: #334155;">
          Thank you for subscribing to official updates from <strong>Khwopa Secondary School (+2)</strong>. You will now receive verified academic notices, NEB board schedules, admission deadlines, and campus achievements directly in your inbox.
        </p>
        <div style="background-color: #ffffff; border: 1px solid #e2d9c8; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold; color: #101b2d; text-transform: uppercase; letter-spacing: 1px;">Subscription Details</p>
          <p style="margin: 4px 0; font-size: 14px; color: #475569;"><strong>Email:</strong> ${normalizedEmail}</p>
          <p style="margin: 4px 0; font-size: 14px; color: #475569;"><strong>Campus:</strong> Dekocha, Ward No. 6, Bhaktapur</p>
          <p style="margin: 4px 0; font-size: 14px; color: #475569;"><strong>Portal:</strong> <a href="https://khwopa.edu.np" style="color: #a68238; text-decoration: none;">khwopa.edu.np</a></p>
        </div>
        <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
          If you have any questions or did not authorize this subscription, please reach out to the college administration at <a href="mailto:info@khwopa.edu.np" style="color: #a68238;">info@khwopa.edu.np</a>.
        </p>
        <div style="border-top: 1px solid #e2d9c8; padding-top: 16px; margin-top: 24px; text-align: center; font-size: 12px; color: #94a3b8;">
          © ${new Date().getFullYear()} Khwopa Secondary School. Dedicated to Country and People.
        </div>
      </div>
    `;

    // Attempt delivery via configured transporter / fallback logger
    await sendAdmissionEmail({
      to: normalizedEmail,
      subject,
      htmlContent,
      textContent: `Welcome to Khwopa Secondary School Updates. You are subscribed with ${normalizedEmail}.`
    });

    // Notify any connected CMS admin live
    const io = req.app.get('io');
    if (io) {
      io.emit('cms:update', {
        type: 'subscriber:new',
        email: normalizedEmail,
        timestamp: new Date().toISOString()
      });
    }

    res.status(200).json({
      success: true,
      isNewSubscriber,
      message: isNewSubscriber
        ? 'Thank you for subscribing! A confirmation email has been sent.'
        : 'Welcome back! Your subscription is active.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Subscription failed. Please try again.' });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: subscribers.length, data: subscribers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



