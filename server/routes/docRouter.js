const express = require('express');
const { Add, GetAllDocuments } = require('../controllers/docController');
const { upload } = require('../middleware/upload');
const router = express.Router();


router.route('/')
.post(upload.single('uploaded'), Add)
.get(GetAllDocuments)





module.exports = router;