const { Router } = require('express');
const controller = require('../controllers/inv_proy_controller');

const router = Router();

router.post('/', controller.create);
router.post('/csv', controller.create_csv);


module.exports = router;