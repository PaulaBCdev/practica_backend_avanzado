import multer from "multer";
import path from "node:path";

// use files with express
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const ruta = path.join(import.meta.dirname, "..", "public", "images");
    cb(null, ruta);
  },
  filename: function (req, file, cb) {
    const str = file.originalname;
    const suffix = Date.now();
    const filename = `${suffix}-${str}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
