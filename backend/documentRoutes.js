const express = require('express');
const multer = require('multer');
const documentController = require('./documentController');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('document'), documentController.uploadDocument);

module.exports = router;
