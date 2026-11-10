import { Notice } from '../models/Notice.js';

export const getNotices = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = { isPublished: true };

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { content: new RegExp(search, 'i') }
      ];
    }

    const notices = await Notice.find(filter).sort({ isPinned: -1, publishedAt: -1 });
    res.status(200).json({ success: true, count: notices.length, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNoticeBySlug = async (req, res) => {
  try {
    const notice = await Notice.findOne({ slug: req.params.slug, isPublished: true });
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }
    res.status(200).json({ success: true, data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

