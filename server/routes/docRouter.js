const express = require('express');
const { Add, GetAllDocuments, UpdateDocument, deleteDocument, viewDocument, findDocument } = require('../controllers/docController');
const { upload } = require('../middleware/upload');
const router = express.Router();


router.route('/')
.post(upload.single('uploaded'), Add)
.get(GetAllDocuments)
.patch(UpdateDocument)
.delete(deleteDocument)


router.route('/views')
.post(viewDocument)


router.route('/search')
.post(findDocument)






module.exports = router;