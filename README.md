# ChillNest - Hệ thống đặt phòng và review homestay/khách sạn

Dự án đồ án sinh viên với mục đích tạo nền tảng đặt phòng online, giới thiệu các khách sạn, homestay tại Việt Nam cho người dùng có nhu cầu du lịch và tìm nơi nghỉ dưỡng. Đồng thời, nền tảng cho phép người dùng và KOL đăng tải các bài viết, video review về các cơ sở lưu trú nhằm quảng bá và chia sẻ kinh nghiệm.

## Công nghệ sử dụng

- **Frontend**: ReactJS, Redux, Tailwind CSS
- **Backend**: NodeJS, Express
- **Database**: MongoDB

## Tính năng chính

### Dành cho người dùng
- Đăng ký, đăng nhập tài khoản
- Tìm kiếm và lọc các cơ sở lưu trú theo nhiều tiêu chí
- Xem thông tin chi tiết về khách sạn/homestay
- Đặt phòng trực tuyến
- Đánh giá và viết review sau khi sử dụng dịch vụ
- Xem các bài đăng, video review từ người dùng khác

### Dành cho KOL (Key Opinion Leaders)
- Tạo và quản lý hồ sơ KOL
- Đăng tải bài viết, video review về các cơ sở lưu trú
- Tương tác với người theo dõi

### Dành cho quản trị viên
- Quản lý người dùng, KOL
- Quản lý danh sách cơ sở lưu trú
- Phê duyệt bài đăng và đánh giá
- Theo dõi số liệu và báo cáo

## Cài đặt và chạy dự án

### Yêu cầu
- Node.js (v14.x trở lên)
- npm hoặc yarn
- MongoDB

### Các bước cài đặt

1. Clone dự án
```
git clone <repository-url>
cd <project-folder>
```

2. Cài đặt dependencies cho backend
```
cd server
npm install
```

3. Cài đặt dependencies cho frontend
```
cd ../client
npm install
```

4. Tạo file .env trong thư mục server với nội dung
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://anvnt96:asdqwe123@cluster0.bs2jhhq.mongodb.net/homestay-booking
JWT_SECRET=your_jwt_secret
```

5. Chạy dự án ở chế độ development
```
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

## Cài đặt môi trường

1. Copy file `.env.example` thành `.env`:
```bash
cd server
cp .env.example .env
```

2. Cập nhật các giá trị trong file `.env`:
   - Liên hệ admin để lấy các giá trị cấu hình cần thiết
   - Đảm bảo không commit file `.env` lên git repository
   - Giữ file `.env` an toàn và không chia sẻ với người khác

3. Các biến môi trường quan trọng cần cấu hình:
   - `MONGODB_URI`: URL kết nối MongoDB
   - `JWT_SECRET`: Secret key cho JWT authentication
   - `SENDGRID_API_KEY`: API key cho SendGrid email service
   - `CLOUDINARY_*`: Cấu hình cho Cloudinary (nếu sử dụng)

## Người phát triển
- Thông tin về nhóm phát triển dự án

# CapStone K23

Dự án CapStone K23 - VTC Academy.

## Cài đặt

```bash
# Cài đặt dependencies cho server
cd server
npm install

# Cài đặt dependencies cho client
cd client
npm install
```

## Chạy dự án

```bash
# Chạy server
cd server
npm start

# Chạy client
cd client
npm start
```
