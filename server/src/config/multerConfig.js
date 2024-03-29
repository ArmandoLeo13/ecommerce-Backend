import multer from "multer";

export default multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./server/uploads");
  },
  // * => req.file.*
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});