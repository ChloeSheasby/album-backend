module.exports = app => {
  const artist = require("../controllers/artist.controller.js");
  var router = require("express").Router();
  // Create a new artist
  router.post("/", artist.create);

  // Retrieve all artists
  router.get("/", artist.findAll);

  // Retrieve all published artists
  router.get("/published", artist.findAllPublished);

  // Retrieve a single artist with id
  router.get("/:id", artist.findOne);

  // Update an artist with id
  router.put("/:id", artist.update);

  // Delete an artist with id
  router.delete("/:id", artist.delete);

  // Delete all artists
  router.delete("/", artist.deleteAll);
  
  app.use('/api/artist', router);
};