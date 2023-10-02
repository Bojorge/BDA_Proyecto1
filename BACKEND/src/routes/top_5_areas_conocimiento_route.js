const { Router } = require('express');
const controller = require('../controllers/top_5_areas_conocimiento_controller');

const router = Router();

router.get('/', controller.get);


module.exports = router;


