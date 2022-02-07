const express = require('express');
const router = express.Router();
const statusCtrl = require('../controllers/status');
const voteCtrl = require('../controllers/votes');
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer_shared');

router.post('/createStatus',auth,multer,statusCtrl.createStatus)
router.get('/getOneStatus',auth,statusCtrl.getOneStatus)
router.get('/getAllStatus',auth,statusCtrl.getAllStatus)
router.get('/profile/getAllStatus',auth,statusCtrl.getAllstatusProfil)
router.get('/chanel/getAllStatus',auth,statusCtrl.getAllstatusChanel)
router.put('/modifyStatus',auth,multer,statusCtrl.modifStatus)
router.put('/voteStatus',auth,voteCtrl.vote)
router.get('/voteNbr',auth,voteCtrl.affichageNbrVotes)

module.exports = router;     