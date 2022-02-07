const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer');

router.get('/:id',auth,userCtrl.infosProfil);
router.get('/statusUser',auth,userCtrl.allUserStatus);
router.put('/modifUser',auth, multer,userCtrl.modifImgProfil);

module.exports = router;        
