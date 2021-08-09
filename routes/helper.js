const express = require('express');
const router = express.Router();

const helperController = require('../controllers/helper')

/* GET helper listing. */
router.get('/', function(req,res){
	res.json({});
});

/* POST Create helper */
router.post('/create', helperController.create);

module.exports = router;
