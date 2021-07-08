const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   email: { type: DataTypes.STRING, unique: true },
   password: { type: DataTypes.STRING },
   name: { type: DataTypes.STRING, allowNull: false },
});

const Picture = sequelize.define('picture', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
   description: { type: DataTypes.STRING, allowNull: false },
   img: { type: DataTypes.STRING, allowNull: false },
   author: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define('type', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Comment = sequelize.define('comment', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   comment: { type: DataTypes.STRING, unique: true, allowNull: false },
   author: { type: DataTypes.STRING, allowNull: false },
});

Type.hasMany(Picture);
Picture.belongsTo(Type);

Picture.hasMany(Comment);
Comment.belongsTo(Picture);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Picture);
Picture.belongsTo(User);

module.exports = {
   User,
   Picture,
   Comment,
   Type,
};
