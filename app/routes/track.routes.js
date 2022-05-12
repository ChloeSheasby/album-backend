module.exports = app => {
  const track = require("../controllers/track.controller.js");
  var router = require("express").Router();
  // Create a new track
  router.post("/", track.create);

  // Retrieve all tracks
  router.get("/", track.findAll);

  // Retrieve all published tracks
  router.get("/published", track.findAllPublished);

  // Retrieve a single track with id
  router.get("/:id", track.findOne);

  // Update an track with id
  router.put("/:id", track.update);

  // Delete an track with id
  router.delete("/:id", track.delete);

  // Delete all tracks
  router.delete("/", track.deleteAll);
  
  app.use('/api/track', router);
};