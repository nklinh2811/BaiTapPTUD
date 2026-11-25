# Dayflow — Personal Task Manager

Ứng dụng quản lý công việc cá nhân với giao diện pastel, sử dụng **HTML, CSS, JavaScript, Node.js, Express và MySQL**.

## 1. Chức năng

- Dashboard hiển thị công việc đến hạn hôm nay.
- Thống kê tổng số task, đang thực hiện, hoàn thành và quá hạn.
- Thêm, xem, chỉnh sửa và xóa công việc (CRUD).
- Đánh dấu công việc hoàn thành.
- Tìm kiếm theo tên công việc.
- Lọc theo trạng thái và mức độ ưu tiên.
- Trang Statistics lấy số liệu từ MySQL và hiển thị biểu đồ.
- Có script dữ liệu mẫu để kiểm thử.

## 2. Công nghệ

- Frontend: HTML5, CSS3, JavaScript.
- Backend: Node.js, Express.js, REST API.
- Database: MySQL.
- Biểu đồ: CSS chart đơn giản, dữ liệu truy xuất từ API.

## 3. Cài đặt và chạy

### Yêu cầu
Cài Node.js và MySQL (có thể dùng XAMPP để chạy MySQL).

### Bước 1: Tạo Database
Mở phpMyAdmin hoặc MySQL Workbench, chạy toàn bộ nội dung file `database/todo_app.sql`.

### Bước 2: Cấu hình môi trường
Sao chép `.env.example` thành `.env`, sau đó chỉnh thông tin kết nối MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=todo_app
PORT=3000
```

### Bước 3: Cài thư viện
Mở Terminal tại thư mục dự án:

```bash
npm install
```

### Bước 4: Khởi động ứng dụng

```bash
npm start
```

Mở trình duyệt tại: http://localhost:3000

## 4. API

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/tasks` | Lấy danh sách task |
| GET | `/api/tasks?search=...` | Tìm kiếm theo tên |
| GET | `/api/tasks?status=todo` | Lọc theo trạng thái |
| GET | `/api/tasks?priority=high` | Lọc theo ưu tiên |
| GET | `/api/tasks/stats/summary` | Lấy dữ liệu thống kê |
| POST | `/api/tasks` | Thêm task |
| PUT | `/api/tasks/:id` | Cập nhật task |
| DELETE | `/api/tasks/:id` | Xóa task |
| GET | `/api/health` | Kiểm tra kết nối Database |

## 5. Cấu trúc thư mục

```text
TODO-APP/
├── backend/
│   ├── config/database.js
│   ├── routes/taskRoutes.js
│   └── server.js
├── database/todo_app.sql
├── frontend/
│   ├── css/style.css
│   ├── js/app.js
│   └── index.html
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 6. Lưu ý

- Dữ liệu công việc được lưu trong MySQL, không dùng localStorage làm Database.
- Dữ liệu mẫu nằm trong file SQL. Nếu không muốn dùng dữ liệu mẫu, bỏ phần `INSERT INTO tasks`.
- Không đưa file `.env` hoặc mật khẩu Database lên GitHub.
- Khi triển khai lên hosting, cần cấu hình biến môi trường và MySQL tương ứng.
