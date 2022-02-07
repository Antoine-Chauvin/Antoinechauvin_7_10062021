const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const adminCtrl = require('../controllers/admin');
const admin = require('../middlewares/admin')

router.put('/blockUser',auth, admin, adminCtrl.blockUser)
router.put('/blockStatus',auth, admin, adminCtrl.blockStatus)

module.exports = router; 