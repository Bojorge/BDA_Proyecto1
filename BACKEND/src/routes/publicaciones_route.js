const { Router } = require('express');
const controller = require('../controllers/publicaciones_controller');

const router = Router();

router.get('/', controller.get);
router.post('/', controller.create);
router.put('/', controller.update)



module.exports = router;


