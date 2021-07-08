const router = require('express').Router();
const pictureRouter = require('./pictureRouter');
const typePictureRouter = require('./typePictureRouter');
const userRouter = require('./userRouter');
const commentRouter = require('./commentRoute');

router.use('/user', userRouter);
router.use('/type', typePictureRouter);
router.use('/picture', pictureRouter);
router.use('/comment', commentRouter);

module.exports = router;
