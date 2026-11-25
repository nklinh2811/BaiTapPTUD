const express = require('express');
const router = express.Router();
const pool = require('../config/database');

const allowedStatus = ['todo', 'in_progress', 'completed'];
const allowedPriority = ['low', 'medium', 'high'];

router.get('/', async (req, res) => {
  try {
    const { search = '', status = '', priority = '', date = '' } = req.query;
    let sql = `SELECT * FROM tasks WHERE title LIKE ?`;
    const params = [`%${search}%`];

    if (allowedStatus.includes(status)) { sql += ' AND status = ?'; params.push(status); }
    if (allowedPriority.includes(priority)) { sql += ' AND priority = ?'; params.push(priority); }
    if (date) { sql += ' AND due_date = ?'; params.push(date); }

    sql += ` ORDER BY FIELD(priority, 'high', 'medium', 'low'), due_date ASC, id DESC`;
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Không thể tải danh sách công việc.' });
  }
});

router.get('/stats/summary', async (_req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        COUNT(*) AS total,
        SUM(status = 'completed') AS completed,
        SUM(status = 'in_progress') AS in_progress,
        SUM(status = 'todo') AS todo,
        SUM(status <> 'completed' AND due_date < CURDATE()) AS overdue,
        SUM(due_date = CURDATE()) AS today
      FROM tasks
    `);
    const [weekly] = await pool.query(`
      SELECT DATE_FORMAT(due_date, '%a') AS day,
             SUM(status = 'completed') AS completed,
             COUNT(*) AS total
      FROM tasks
      WHERE due_date BETWEEN DATE_SUB(CURDATE(), INTERVAL 6 DAY) AND CURDATE()
      GROUP BY due_date ORDER BY due_date
    `);
    res.json({ ...rows[0], weekly });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Không thể tải thống kê.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description = '', start_date = null, due_date, priority = 'medium',
      status = 'todo', category = 'Personal' } = req.body;
    if (!title?.trim() || !due_date) {
      return res.status(400).json({ message: 'Vui lòng nhập tên công việc và deadline.' });
    }
    if (!allowedPriority.includes(priority) || !allowedStatus.includes(status)) {
      return res.status(400).json({ message: 'Mức ưu tiên hoặc trạng thái không hợp lệ.' });
    }
    const [result] = await pool.query(
      `INSERT INTO tasks (title, description, start_date, due_date, priority, status, category)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title.trim(), description, start_date || null, due_date, priority, status, category]
    );
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Không thể thêm công việc.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description = '', start_date = null, due_date, priority = 'medium',
      status = 'todo', category = 'Personal' } = req.body;
    if (!title?.trim() || !due_date || !allowedPriority.includes(priority) || !allowedStatus.includes(status)) {
      return res.status(400).json({ message: 'Thông tin công việc chưa hợp lệ.' });
    }
    const [result] = await pool.query(
      `UPDATE tasks SET title=?, description=?, start_date=?, due_date=?,
       priority=?, status=?, category=? WHERE id=?`,
      [title.trim(), description, start_date || null, due_date, priority, status, category, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ message: 'Không tìm thấy công việc.' });
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Không thể cập nhật công việc.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Không tìm thấy công việc.' });
    res.json({ message: 'Đã xóa công việc.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Không thể xóa công việc.' });
  }
});

module.exports = router;
