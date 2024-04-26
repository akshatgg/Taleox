import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/", // Path to upload
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (_req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (
    ext !== ".jpg" &&
    ext !== ".jpeg" &&
    ext !== ".webp" &&
    ext !== ".png" &&
    ext !== ".mp4"
  ) {
    cb(new Error(`Unsupported file type! ${ext}`), false);
    return;
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB file size limit
  fileFilter: fileFilter,
});

export default upload;
