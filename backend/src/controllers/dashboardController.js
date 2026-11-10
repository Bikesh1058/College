import { Page } from '../models/Page.js';
import { Faculty } from '../models/Faculty.js';
import { Programme } from '../models/Programme.js';
import { Notice } from '../models/Notice.js';
import { User } from '../models/User.js';

export const getDashboardStats = async (req, res) => {
  try {
    const [pagesCount, facultyCount, programmesCount, noticesCount, usersCount] = await Promise.all([
      Page.countDocuments(),
      Faculty.countDocuments(),
      Programme.countDocuments(),
      Notice.countDocuments(),
      User.countDocuments()
    ]);

    const recentNotices = await Notice.find().sort({ createdAt: -1 }).limit(5);
    const recentPages = await Page.find().sort({ updatedAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      stats: {
        pages: pagesCount,
        faculty: facultyCount,
        programmes: programmesCount,
        notices: noticesCount,
        users: usersCount
      },
      recentNotices,
      recentPages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

