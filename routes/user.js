const router = require('express').Router();
const user = require('../controllers/user');
const { Auth } = require('../middleware/auth');
const { upload } = require('../middleware/multer')


router.post("/", user.register)
router.get("/", user.getProfil)
router.get("/verify/:id", user.verify)
router.post("/login", user.login)
router.get('/all',Auth, user.getAll)
router.get('/:id',Auth, user.getById)
router.put('/transfer/:id', user.transfer)
router.put('/avatar/:id',upload.single('avatar'), user.avatar)
router.put('/profile/:id',Auth, user.profile)
router.post('/pin/:id',Auth, user.checkPin)
router.post('/change/:id', Auth, user.change)

module.exports = router