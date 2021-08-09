const locations = require("../controllers/locations.js");

var router = require("express").Router();

// Retrieve all locations
router.get("/", locations.findAll);

// Create a new Tutorial
router.post("/create", locations.create);

// Retrieve all published locations
router.get("/published", locations.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", locations.findOne);

// Update a Tutorial with id
router.put("/:id", locations.update);

// Delete a Tutorial with id
router.delete("/:id", locations.delete);

// Create a new Tutorial
router.delete("/", locations.deleteAll);

module.exports = router;