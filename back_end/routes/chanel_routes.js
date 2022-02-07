const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const chanelCtrl = require('../controllers/chanel');

router.post('/createChanel', auth,chanelCtrl.createChanel);
router.get('/getChanels', auth,chanelCtrl.getAllChanel); 

module.exports = router; 