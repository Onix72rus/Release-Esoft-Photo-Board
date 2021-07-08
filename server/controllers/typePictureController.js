const { Type } = require('../models/models');
const Error = require('../error/apiError');

class TypePictureController {
   async create(req, res, next) {
      try {
         const { name } = req.body;
         const typePicture = await Type.create({ name });

         return res.json(typePicture);
      } catch (error) {
         next(Error.badRequest(error.message));
      }
   }

   async get(req, res, next) {
      try {
         const allTypePicture = await Type.findAll();

         return res.json(allTypePicture);
      } catch (error) {
         next(Error.badRequest(error.message));
      }
   }
}

module.exports = new TypePictureController();
