const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController')
const { validateLendRequest, validateReturnRequest } = require('../middleware/requestValidator');

router.post('/lend', validateLendRequest, userController.lendBook);
router.post('/return', validateReturnRequest, userController.returnBook);
router.get('/overdue', userController.checkOverdue);

module.exports = router;