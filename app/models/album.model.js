module.exports = (sequelize, Sequelize) => {
  const Album = sequelize.define("album", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    genre: {
      type: Sequelize.STRING
    },
    publishedDate: {
      type: Sequelize.DATE
    }
  });
  return Album;
};