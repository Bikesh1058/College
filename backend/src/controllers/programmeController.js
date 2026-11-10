import { Programme } from '../models/Programme.js';

export const getProgrammes = async (req, res) => {
  try {
    const { stream } = req.query;
    const filter = { isPublished: true };
    if (stream) filter.facultyStream = stream;

    const programmes = await Programme.find(filter).sort({ title: 1 });
    res.status(200).json({ success: true, count: programmes.length, data: programmes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProgrammeBySlug = async (req, res) => {
  try {
    const programme = await Programme.findOne({ slug: req.params.slug, isPublished: true });
    if (!programme) {
      return res.status(404).json({ success: false, message: 'Programme not found' });
    }
    res.status(200).json({ success: true, data: programme });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProgramme = async (req, res) => {
  try {
    const programme = await Programme.create(req.body);
    res.status(201).json({ success: true, data: programme });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProgramme = async (req, res) => {
  try {
    const programme = await Programme.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!programme) {
      return res.status(404).json({ success: false, message: 'Programme not found' });
    }
    res.status(200).json({ success: true, data: programme });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProgramme = async (req, res) => {
  try {
    const programme = await Programme.findByIdAndDelete(req.params.id);
    if (!programme) {
      return res.status(404).json({ success: false, message: 'Programme not found' });
    }
    res.status(200).json({ success: true, message: 'Programme removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

