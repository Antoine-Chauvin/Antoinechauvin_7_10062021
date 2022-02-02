const express = require('express');
const router = express.Router();
const statusCtrl = require('../controllers/status');
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer_shared');

router.post('/createStatus',auth,statusCtrl.createStatus)
router.get('/getOneStatus',auth,statusCtrl.getOneSatus)
router.get('/getAllstatus',auth,statusCtrl.getAllSatus)
router.get('/profile/getAllstatus',auth,statusCtrl.getAllstatusProfil)
router.get('/chanel/getAllstatus',auth,statusCtrl.getAllstatusChanel)
router.put('/modifyStatus',auth,statusCtrl.modifStatus)


module.exports = router;     