const { Router } = require('express');
const controller = require('../controllers/proy_art_controller');

const router = Router();

router.get('/', controller.get);
router.post('/', controller.create);


module.exports = router;

