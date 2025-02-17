const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../utils/multer');

// Subir una foto (protegida por autenticación)
router.post('/upload', authMiddleware, upload.single('file'), photoController.uploadPhoto);

module.exports = router;