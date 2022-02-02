const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middlewares/auth')

router.get('/allcomment',auth,commentCtrl.getComments);
router.post('/createComment', auth,commentCtrl.createComment);
router.put('/modifyComment', auth,commentCtrl.modifcomment);

module.exports = router;  