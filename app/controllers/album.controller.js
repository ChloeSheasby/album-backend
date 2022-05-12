const db = require("../models");
const Album = db.album;
const Op = db.Sequelize.Op;
// Create and Save a new album
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a album
  const album = {
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    publishedDate: req.body.publishedDate,
  };
  // Save album in the database
  Album.create(album)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the album."
      });
    });
};
// Retrieve all albums from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Album.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving albums."
      });
    });
};
// Find a single album with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Album.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find album with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving album with id=" + id
      });
    });
};
// Update a album by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Album.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "album was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update album with id=${id}. Maybe album was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating album with id=" + id
      });
    });
};
// Delete a album with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Album.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "album was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete album with id=${id}. Maybe album was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete album with id=" + id
      });
    });
};
// Delete all albums from the database.
exports.deleteAll = (req, res) => {
  Album.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} albums were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all albums."
      });
    });
};
// Find all published albums
exports.findAllPublished = (req, res) => {
  Album.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving albums."
      });
    });
};