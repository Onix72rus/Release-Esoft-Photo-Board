const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
require('dotenv').config();

const generateJwt = (id, email, name) => {
   return jwt.sign({ id, email, name }, process.env.SECRET_KEY, {
      expiresIn: '10h',
   });
};

class UserController {
   async registration(req, res, next) {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
         return next(
            ApiError.badRequest('Некорректный email, password или имя')
         );
      }

      const persona = await User.findOne({ where: { email } });
      if (persona) {
         return next(
            ApiError.badRequest('Пользователь с таким email уже существует')
         );
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, password: hashPassword, name });
      const token = generateJwt(user.id, user.email, user.name);

      return res.json({ token });
   }

   async login(req, res, next) {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
         return next(ApiError.internal('Пользователь не найден'));
      }

      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
         return next(ApiError.internal('Указан неверный пароль'));
      }
      const token = generateJwt(user.id, user.email, user.name);

      return res.json({ token });
   }

   async check(req, res, next) {
      const token = generateJwt(req.user.id, req.user.email);

      return res.json({ token });
   }
}

module.exports = new UserController();
