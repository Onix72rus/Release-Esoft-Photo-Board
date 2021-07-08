const jwt = require('jsonwebtoken');
require('dotenv').config();

//middleWare продолжит работу, если токен находится внутри локального хранилища.

module.exports = (req, res, next) => {
   try {
      // Получаем токен из заголовка
      const jwtToken = req.header('token');

      // Проверяем токен на валидность(выдаем ошибку)
      if (!jwtToken) {
         return res.status(403).json({ msg: 'В авторизации отказано' });
      }

      // Проверяем токен
      const payload = jwt.verify(jwtToken, process.env.SECRET_KEY);

      req.user = payload.user;
      next();
   } catch (error) {
      res.status(401).json({ msg: 'Токен не действителен' });
   }
};
