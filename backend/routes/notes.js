const express = require('express');
const router = express.Router();
const db = require('../db');

// List all notes
router.get('/', (req, res) => {
  db.all('SELECT * FROM notes ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get single
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM notes WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Note not found' });
    res.json(row);
  });
});

// Create
router.post('/', (req, res) => {
  const { title, content } = req.body;
  if (!title || title.trim() === '') return res.status(400).json({ error: 'Title required' });
  const sql = 'INSERT INTO notes (title, content) VALUES (?, ?)';
  db.run(sql, [title, content || ''], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    const newId = this.lastID;
    db.get('SELECT * FROM notes WHERE id = ?', [newId], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json(row);
    });
  });
});

// Update
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  if (!title || title.trim() === '') return res.status(400).json({ error: 'Title required' });
  const sql = 'UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  db.run(sql, [title, content || '', id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Note not found' });
    db.get('SELECT * FROM notes WHERE id = ?', [id], (err2, row) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(row);
    });
  });
});

// Delete
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM notes WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Note not found' });
    res.json({ success: true });
  });
});

module.exports = router;