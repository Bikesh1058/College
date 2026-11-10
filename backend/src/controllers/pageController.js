import { Page } from '../models/Page.js';

// GET /api/v1/pages/:slug (Public)
export const getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ slug, status: 'published' });

    if (!page) {
      return res.status(404).json({ success: false, message: `Page '/${slug}' not found` });
    }

    res.status(200).json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving page', error: error.message });
  }
};

// GET /api/v1/pages (Admin / Public list)
export const getAllPages = async (req, res) => {
  try {
    const query = req.user ? {} : { status: 'published' };
    const pages = await Page.find(query).select('title slug pageType status updatedAt');
    res.status(200).json({ success: true, count: pages.length, data: pages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// POST /api/v1/pages (CMS Protected)
export const createPage = async (req, res) => {
  try {
    const page = await Page.create({
      ...req.body,
      createdBy: req.user ? req.user.name : 'admin'
    });
    res.status(201).json({ success: true, data: page });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/v1/pages/:slug (CMS Protected)
export const updatePage = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOneAndUpdate(
      { slug },
      { ...req.body, updatedBy: req.user ? req.user.name : 'admin' },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: page });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

