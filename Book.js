const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  deskripsi: { type: String, required: true },
  harga: { type: Number, required: true }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
