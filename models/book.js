'use strict';
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    title: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {});
  book.associate = function(models) {
    // a book BELONGS to an author
    models.book.belongsTo(models.author)
  };
  return book;
};