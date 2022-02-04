const express = require('express');
const router = express.Router();
const statusCtrl = require('../controllers/status');
const voteCtrl = require('../controllers/votes');
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer_shared');

router.post('/createStatus',auth,statusCtrl.createStatus)
router.get('/getOneStatus',auth,statusCtrl.getOneSatus)
router.get('/getAllstatus',auth,statusCtrl.getAllSatus)
router.get('/profile/getAllstatus',auth,statusCtrl.getAllstatusProfil)
router.get('/chanel/getAllstatus',auth,statusCtrl.getAllstatusChanel)
router.put('/modifyStatus',auth,statusCtrl.modifStatus)
router.put('/voteStatus',auth,voteCtrl.vote)
router.get('/voteNbr',auth,voteCtrl.affichageNbrVotes)

module.exports = router;     