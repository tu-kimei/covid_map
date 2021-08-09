const item_list_model = require('../models/item_list');

// Retrieve all locationss from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  item_list_model.find(condition)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving locations."
      });
    });
};

// Create and Save a new item_list
exports.create = (req, res) => {
  // Validate request
  if (!req.query.lat || !req.query.long) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a item_list
  const locations = new locations({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save locations in the database
  locations
    .save(locations)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the locations."
      });
    });
};

// Find a single locations with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  locations.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found locations with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving locations with id=" + id });
    });
};

// Update a locations by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  locations.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update locations with id=${id}. Maybe locations was not found!`
        });
      } else res.send({ message: "locations was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating locations with id=" + id
      });
    });
};

// Delete a locations with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  locations.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete locations with id=${id}. Maybe locations was not found!`
        });
      } else {
        res.send({
          message: "locations was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete locations with id=" + id
      });
    });
};

// Delete all locationss from the database.
exports.deleteAll = (req, res) => {
  locations.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} locationss were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all locationss."
      });
    });
};

// Find all published locationss
exports.findAllPublished = (req, res) => {
  locations.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving locationss."
      });
    });
};
