const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const supplierController = require('../controllers/supplierController');

router.get('/subjects', subjectController.getSubjects);
router.get('/supplier/:subjectId', supplierController.getSupplier);
router.post('/supplier', supplierController.create);
router.put('/supplier/:rowId', supplierController.update);
router.delete('/supplier/:rowId', supplierController.remove);

module.exports = router;