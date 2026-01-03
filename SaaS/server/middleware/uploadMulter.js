import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/profiles",
  filename: (req, file, cb) => {
    cb(
      null,
      `profile-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

export default upload;
