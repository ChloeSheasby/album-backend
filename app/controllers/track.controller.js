const db = require("../models");
const Track = db.track;
const Op = db.Sequelize.Op;
// Create and Save a new track
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a track
  const track = {
    title: req.body.title,
    length: req.body.length
  };
  // Save track in the database
  Track.create(track)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the track."
      });
    });
};
// Retrieve all tracks from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Track.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tracks."
      });
    });
};
// Find a single track with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Track.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find track with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving track with id=" + id
      });
    });
};
// Update a track by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Track.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "track was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update track with id=${id}. Maybe track was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating track with id=" + id
      });
    });
};
// Delete a track with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Track.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "track was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete track with id=${id}. Maybe track was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete track with id=" + id
      });
    });
};
// Delete all tracks from the database.
exports.deleteAll = (req, res) => {
  Track.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} tracks were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tracks."
      });
    });
};
// Find all published tracks
exports.findAllPublished = (req, res) => {
  Track.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tracks."
      });
    });
};