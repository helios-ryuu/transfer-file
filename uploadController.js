import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const uploadFolder = 'uploads/';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const randomName = crypto.randomBytes(16).toString('hex');
    cb(null, randomName + ext);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }
});

export const createUploadRouter = (io) => {
  const router = express.Router();

  router.post('/', (req, res) => {
    upload.array('files', 1000)(req, res, err => {
      if (err) {
        return res.status(400).send('Lỗi upload file: ' + err.message);
      }
      if (!req.files || req.files.length === 0) {
        return res.status(400).send('Không có file nào được upload.');
      }
      let processed = 0;
      req.files.forEach(file => {
        const ext = path.extname(file.originalname);
        if (!ext) {
          return res.status(400).send('File không có định dạng hợp lệ!');
        }
        processed++;
        if (processed === req.files.length) {
          // Phát sự kiện cho client qua socket.io
          io.emit('uploadComplete', { message: 'File đã được upload thành công!', count: req.files.length });
          // Sau khi upload thành công, chuyển hướng về trang chủ với thông báo
          return res.redirect('/?upload=success');
        }
      });
    });
  });
  
  

  return router;
};
