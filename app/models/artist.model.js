module.exports = (sequelize, Sequelize) => {
  const Artist = sequelize.define("artist", {
    fName: {
      type: Sequelize.STRING
    },
    lName: {
      type: Sequelize.STRING
    }
  });
  return Artist;
};