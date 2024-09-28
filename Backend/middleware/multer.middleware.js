import path from 'path';
import multer from 'multer';

// Define the disk storage for multer
const storage = multer.diskStorage({
  destination: 'uploads/', // Path to upload the files
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // To avoid filename collisions
  },
});

// File filter to restrict uploads to images and videos
const fileFilter = (_req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (
    ext !== '.jpg' &&
    ext !== '.jpeg' &&
    ext !== '.webp' &&
    ext !== '.png' &&
    ext !== '.mp4'
  ) {
    cb(new Error(`Unsupported file type: ${ext}`), false);
  } else {
    cb(null, true);
  }
};

// Setup multer for handling file uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB file size limit
  fileFilter: fileFilter,
});

export default upload;
