const { Router } = require('express');
const controller = require('../controllers/inv_proy_controller');

const router = Router();

router.post('/', controller.create);


module.exports = router;