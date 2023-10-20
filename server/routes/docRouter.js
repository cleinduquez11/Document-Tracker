const express = require('express');
const {deleteDocument, viewDocument, findDocument, addDocument, getAllDocuments, updateDocument } = require('../controllers/docController');
const { upload } = require('../middleware/upload');
const router = express.Router();


router.route('/')
.post(upload.single('uploaded'), addDocument)
.get(getAllDocuments)
.patch(updateDocument)
.delete(deleteDocument)


router.route('/views')
.post(viewDocument)


router.route('/search')
.post(findDocument)






module.exports = router;