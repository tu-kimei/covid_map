const express = require('express');
const router = express.Router();

const item_list_controller = require('../controllers/item_list');
const item_list_model = require('../models/item_list');

/* GET item_list listing. */
router.get('/', item_list_controller.findAll);

/* Create item_list */
router.get('/create', item_list_controller.create);

module.exports = router;
