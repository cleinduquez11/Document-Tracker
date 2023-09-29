const express = require('express');
const { Add } = require('../controllers/docController');
const { upload } = require('../middleware/upload');
const router = express.Router();


router.route('/')
.post(upload.single('uploaded'), Add)





module.exports = router;