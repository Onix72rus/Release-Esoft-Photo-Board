const router = require('express').Router();
const PictureController = require('../controllers/pictureController');

router.post('/', PictureController.create);
router.get('/', PictureController.get);
router.get('/:id', PictureController.getOne);
router.put('/:id', PictureController.editOne);
router.delete('/:id', PictureController.deletePost);

module.exports = router;
