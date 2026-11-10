import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const uploadsDirectory = path.join(__dirname, '..', '..', 'uploads');

fs.mkdirSync(uploadsDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadsDirectory,
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const cleanName = path.basename(file.originalname, extension).replace(/[^a-zA-Z0-9]/g, '-');
    callback(null, `${cleanName}-${Date.now()}${extension}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    callback(null, true);
    return;
  }
  callback(new Error('Only image and PDF files are allowed'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export default upload;

