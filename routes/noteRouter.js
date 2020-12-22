const express = require('express');
const noteController = require('../controllers/noteController');

const router = express.Router();

router
.route('/get')
.post(noteController.getNote);

router
.route('/save')
.post(noteController.postNote);

router
.route('/delete/:id')
.delete(noteController.deleteNote);

module.exports = router;