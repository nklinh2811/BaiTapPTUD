CREATE DATABASE IF NOT EXISTS todo_app
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE todo_app;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  description TEXT NULL,
  start_date DATE NULL,
  due_date DATE NOT NULL,
  priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  status ENUM('todo', 'in_progress', 'completed') NOT NULL DEFAULT 'todo',
  category VARCHAR(80) NOT NULL DEFAULT 'Personal',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_due_date (due_date),
  INDEX idx_status (status),
  INDEX idx_priority (priority)
);

-- Dữ liệu mẫu để minh họa. Có thể bỏ qua phần INSERT nếu không cần.
INSERT INTO tasks (title, description, start_date, due_date, priority, status, category) VALUES
('Hoàn thành bài tập JavaScript', 'Ôn lại DOM và xử lý sự kiện', CURDATE(), CURDATE(), 'high', 'in_progress', 'Study'),
('Thiết kế giao diện TODO App', 'Hoàn thiện dashboard và trang thống kê', CURDATE(), CURDATE(), 'medium', 'todo', 'Project'),
('Đọc tài liệu môn học', 'Đọc chương quản lý dự án', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 'low', 'completed', 'Study'),
('Chuẩn bị nội dung thuyết trình', 'Tổng hợp các ý chính cho bài thuyết trình', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 'high', 'todo', 'Personal'),
('Lên kế hoạch tuần mới', 'Sắp xếp deadline và lịch học', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 'medium', 'completed', 'Personal');
