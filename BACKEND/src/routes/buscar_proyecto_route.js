const { Router } = require('express');
const controller = require('../controllers/buscar_proyecto_controller');

const router = Router();

router.get('/', controller.get);


module.exports = router;
