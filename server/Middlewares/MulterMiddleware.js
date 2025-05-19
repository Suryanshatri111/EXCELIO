import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqeSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqeSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext === ".xls" || ext === ".xlsx") {
    cb(null, true);
  } else {
    cb(new Error("Only Excel files are allowed!"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5mb file only
});
