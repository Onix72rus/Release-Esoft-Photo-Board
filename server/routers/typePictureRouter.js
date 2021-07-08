const router = require('express').Router();
const typePictureController = require('../controllers/typePictureController');

router.post('/', typePictureController.create);
router.get('/', typePictureController.get);

module.exports = router;
