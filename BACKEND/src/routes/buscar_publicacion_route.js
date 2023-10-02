const { Router } = require('express');
const controller = require('../controllers/buscar_publicacion_controller');

const router = Router();

router.get('/:id', controller.get);


module.exports = router;

