const express = require('express');
const notesController = require('../controllers/notesController');

const router = express.Router();

router
.route('/get')
.post(notesController.getNotes);

router
.route('/save')
.post(notesController.postNotes);

router
.route('/delete/:id')
.delete(notesController.deleteNote);

module.exports = router;