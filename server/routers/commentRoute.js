const router = require('express').Router();
const CommentController = require('../controllers/commentController');

router.post('/', CommentController.create);
router.get('/', CommentController.get);

module.exports = router;
