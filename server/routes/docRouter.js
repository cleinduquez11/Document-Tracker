const express = require('express');
const { Add, GetAllDocuments, UpdateDocument, deleteDocument, viewDocument } = require('../controllers/docController');
const { upload } = require('../middleware/upload');
const router = express.Router();


router.route('/')
.post(upload.single('uploaded'), Add)
.get(GetAllDocuments)
.patch(upload.single('uploaded'),UpdateDocument)
.delete(deleteDocument)


router.route('/views')
.post(viewDocument)






module.exports = router;