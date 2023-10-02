const { Router } = require('express');
const controller = require('../controllers/buscar_area_conocimiento_controller');

const router = Router();

router.get('/:id', controller.get);


module.exports = router;
