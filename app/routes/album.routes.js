module.exports = app => {
  const album = require("../controllers/album.controller.js");
  var router = require("express").Router();
  // Create a new album
  router.post("/", album.create);

  // Retrieve all albums
  router.get("/", album.findAll);

  // Retrieve all published albums
  router.get("/published", album.findAllPublished);

  // Retrieve a single album with id
  router.get("/:id", album.findOne);

  // Update an album with id
  router.put("/:id", album.update);

  // Delete an album with id
  router.delete("/:id", album.delete);

  // Delete all albums
  router.delete("/", album.deleteAll);
  
  app.use('/api/album', router);
};