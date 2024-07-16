const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a book
router.post('/', async (req, res) => {
  const book = new Book({
    nama: req.body.nama,
    deskripsi: req.body.deskripsi,
    harga: req.body.harga
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific book
router.get('/:id', getBook, (req, res) => {
  res.json(res.book);
});

// Update a book
router.patch('/:id', getBook, async (req, res) => {
  if (req.body.nama != null) {
    res.book.nama = req.body.nama;
  }
  if (req.body.deskripsi != null) {
    res.book.deskripsi = req.body.deskripsi;
  }
  if (req.body.harga != null) {
    res.book.harga = req.body.harga;
  }
  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book
router.delete('/:id', getBook, async (req, res) => {
  try {
    await Book.deleteOne({ _id: res.book._id }); // Use the model's deleteOne method
    res.json({ message: 'Deleted Book' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.book = book;
  next();
}

module.exports = router;
