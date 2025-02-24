## Transfer File Hosting Application
Ứng dụng này cho phép host một server trên cổng **3000** trên máy chủ (server) và truy cập từ các thiết bị trong cùng mạng nội bộ thông qua địa chỉ IPv4 của server.

### 1. Yêu Cầu (Prerequisites)
#### Node.js:
- Tải và cài đặt Node.js từ [nodejs.org](https://nodejs.org/).
- **Lưu ý:** Sau khi cài đặt, đảm bảo biến môi trường `PATH` đã được cấu hình để nhận diện lệnh `node` và `npm`.

#### Git:
- Để clone repository, bạn cần cài đặt Git từ [git-scm.com](https://git-scm.com/).

#### Quyền chạy Script:
- Nếu gặp lỗi không cho phép chạy file script trên Windows, bạn cần mở Command Prompt với quyền Administrator và thực hiện lệnh sau:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
  ```
  Lệnh này cho phép chạy các script được ký hoặc được đánh dấu là "RemoteSigned".

### 2. Clone Repository
Clone dự án từ GitHub bằng lệnh sau trong Command Prompt hoặc Git Bash:
```bash
git clone https://github.com/helios-ryuu/transfer-file.git
```
Sau khi clone về, chuyển vào thư mục dự án:
```bash
cd transfer-file
```

### 3. Cài Đặt Các Package
Trong thư mục dự án, chạy lệnh cài đặt các package cần thiết:
```bash
npm install
```
Nếu có lỗi liên quan đến quyền hoặc cài đặt, bạn hãy kiểm tra cấu hình Node.js và biến môi trường `PATH`.

### 4. Chạy Ứng Dụng
#### 4.1. Cấu Hình Môi Trường (Nếu Cần)
- Mở Command Prompt với quyền Administrator để đảm bảo không gặp lỗi khi chạy file script.
- Nếu gặp lỗi liên quan đến quyền thực thi, thực hiện lệnh:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
  ```

#### 4.2. Chạy File START.bat
Chạy file `START.bat` để host ứng dụng ở cổng **3000**:
```bat
@echo off
cd /d "đường_dẫn_tới_thư_mục_dự_án"  REM Nếu chưa ở đúng thư mục
npm install
IF %ERRORLEVEL% NEQ 0 (
    echo Lỗi khi chạy npm install.
    pause
    exit /b %ERRORLEVEL%
)
node index.js
pause
```
**Lưu ý:** File `START.bat` đã được cấu hình để thực hiện các bước:
- Cài đặt các package qua `npm install`
- Kiểm tra lỗi cài đặt
- Khởi chạy ứng dụng bằng lệnh `node index.js`

### 5. Xác Định Địa Chỉ IP Của Server
Để xác định địa chỉ IPv4 của server, mở Command Prompt và chạy lệnh:
```bash
ipconfig
```
Tìm mục **IPv4 Address** trong kết quả xuất ra (ví dụ: `192.168.1.12`).

### 6. Truy Cập Ứng Dụng Từ Các Thiết Bị Khác
Trên các thiết bị thuộc cùng mạng với server, mở trình duyệt và nhập URL theo định dạng:
```cpp
https://<IPv4 của server>:3000/
```
**Ví dụ:**  
Nếu địa chỉ IPv4 của server là `192.168.1.12` thì truy cập:
```cpp
https://192.168.1.12:3000/
```

**Lưu ý:**
- Nếu ứng dụng sử dụng HTTPS, có thể sẽ xuất hiện cảnh báo về bảo mật do chứng chỉ SSL chưa được cấp phát hợp lệ. bạn có thể bỏ qua cảnh báo (nếu đang trong môi trường test nội bộ) hoặc cấu hình chứng chỉ SSL hợp lệ.
