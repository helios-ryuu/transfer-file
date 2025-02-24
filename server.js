import express from 'express';
import path from 'path';
import fs from 'fs';
import https from 'https';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import { setupMiddleware } from './middleware.js';
import { createUploadRouter } from './uploadController.js';

// Khởi tạo biến môi trường từ file .env
dotenv.config();

// Hàm tạo server với các tham số tùy chỉnh
export const createServer = ({
  port = process.env.PORT || 3000,
  sslKeyPath = './ssl/private-key.pem',
  sslCertPath = './ssl/certificate.pem',
  staticFolder = 'public'
} = {}) => {
  const app = express();

  // Thiết lập các middleware bảo mật, log, CORS,...
  setupMiddleware(app);

  // Cho phép truy cập các file tĩnh từ thư mục được cung cấp
  app.use(express.static(staticFolder));

  // Trang chủ: gửi file index.html từ static folder
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(staticFolder, 'index.html'));
  });

  // Đọc file chứng chỉ SSL
  const sslOptions = {
    key: fs.readFileSync(path.resolve(sslKeyPath)),
    cert: fs.readFileSync(path.resolve(sslCertPath))
  };

  // Tạo server HTTPS
  const server = https.createServer(sslOptions, app);

  // Thiết lập Socket.io
  const io = new SocketIOServer(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
  });

  io.on('connection', (socket) => {
    console.log('Client kết nối:', socket.id);
    socket.on('disconnect', () => {
      console.log('Client ngắt kết nối:', socket.id);
    });
  });

  // Sử dụng upload router, truyền io vào
  const uploadRouter = createUploadRouter(io);
  app.use('/upload', uploadRouter);

  return { server, port, io };
};
