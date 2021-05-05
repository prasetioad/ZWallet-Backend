const router = require('express').Router();
const trx = require('../controllers/trx');
const { Auth } = require('../middleware/auth');


router.get('/',Auth, trx.getTrx)
router.get('/:id', trx.getTrxById)
router.get('/date/:id', trx.getTrxByDate)
router.post('/', trx.creatTrx)

module.exports = router