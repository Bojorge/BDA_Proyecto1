const { Router } = require('express');
const controller = require('../controllers/investigadores_controller');

const router = Router();

router.post('/', controller.add);

module.exports = router;


