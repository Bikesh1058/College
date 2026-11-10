import { Faculty } from '../models/Faculty.js';

// GET /api/v1/faculty (Public Directory with multi-level filtering)
export const getFacultyList = async (req, res) => {
  try {
    const { stream, role, subject, search } = req.query;
    const filter = {};

    if (stream && stream !== 'All Streams') {
      filter.facultyStream = stream;
    }

    if (role && role !== 'All Roles') {
      filter.roleCategory = role;
    }

    if (subject && subject !== 'All Subjects') {
      filter.subject = new RegExp(subject, 'i');
    }

    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { department: new RegExp(search, 'i') },
        { subject: new RegExp(search, 'i') },
        { qualification: new RegExp(search, 'i') }
      ];
    }

    const faculty = await Faculty.find(filter).sort({ order: 1, name: 1 });
    res.status(200).json({ success: true, count: faculty.length, data: faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving faculty', error: error.message });
  }
};

// POST /api/v1/faculty (CMS Protected)
export const createFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json({ success: true, data: faculty });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/v1/faculty/:id (CMS Protected)
export const updateFaculty = async (req, res) => {
  try {
    const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
      ? { $or: [{ _id: req.params.id }, { id: req.params.id }] }
      : { id: req.params.id };

    const faculty = await Faculty.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true
    });
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' });
    }
    res.status(200).json({ success: true, data: faculty });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/v1/faculty/:id (CMS Protected)
export const deleteFaculty = async (req, res) => {
  try {
    const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
      ? { $or: [{ _id: req.params.id }, { id: req.params.id }] }
      : { id: req.params.id };

    const faculty = await Faculty.findOneAndDelete(query);
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty member not found' });
    }
    res.status(200).json({ success: true, message: 'Faculty record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

