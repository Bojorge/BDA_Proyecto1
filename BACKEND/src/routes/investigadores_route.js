const { Router } = require('express');
const controller = require('../controllers/investigadores_controller');

const router = Router();

router.get('/', controller.get);
router.post('/', controller.post);



module.exports = router;


