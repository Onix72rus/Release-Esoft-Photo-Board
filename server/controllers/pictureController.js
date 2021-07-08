const uuid = require('uuid');
const path = require('path');
const { Picture } = require('../models/models');
const Error = require('../error/apiError');

class PictureController {
   async create(req, res, next) {
      try {
         const { name, typeId, description, userId, author } = req.body;
         const { img } = req.files;
         let fileName = uuid.v4() + '.jpg';
         img.mv(path.resolve(__dirname, '..', 'static', fileName));
         const postPicture = await Picture.create({
            name,
            description,
            typeId,
            userId,
            img: fileName,
            author,
         });

         return res.json(postPicture);
      } catch (error) {
         next(Error.badRequest(error.message));
      }
   }

   async get(req, res) {
      const typeId = req.query.typeId;

      let postFilter;
      if (!typeId) {
         postFilter = await Picture.findAll();
      }
      if (typeId) {
         postFilter = await Picture.findAll({ where: { typeId } });
      }

      return res.json(postFilter);
   }

   async getOne(req, res) {
      const { id } = req.params;
      const onePicture = await Picture.findOne({
         where: { id },
      });
      return res.json(onePicture);
   }

   async deletePost(req, res) {
      const { id } = req.params;
      const deletePicture = await Picture.destroy({
         where: { id },
      });
      return res.json(deletePicture);
   }

   async editOne(req, res) {
      const { id } = req.params;
      const { name, description } = req.body;
      try {
         const editPost = await Picture.findOne({
            where: { id },
         });
         editPost.name = name;
         editPost.description = description;

         await editPost.save();

         return res.json(editPost);
      } catch (error) {
         next(Error.badRequest(error.message));
      }
   }
}
module.exports = new PictureController();
