const { Comment } = require('../models/models');
const Error = require('../error/apiError');

class CommentController {
   async create(req, res) {
      const { comment, author, userId, pictureId } = req.body;
      try {
         const commentPic = await Comment.create({
            comment,
            author,
            pictureId,
            userId,
         });

         return res.json(commentPic);
      } catch (error) {
         next(Error.badRequest(error.message));
      }
   }

   async get(req, res, next) {
      try {
         const allComment = await Comment.findAll();

         return res.json(allComment);
      } catch (error) {
         next(Error.badRequest(error.message));
      }
   }
}
module.exports = new CommentController();
