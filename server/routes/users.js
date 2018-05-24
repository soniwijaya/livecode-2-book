const router = require('express').Router()

const {
  registerUser,
  loginManual
} = require('../controllers/user.controller')

router.post('/', registerUser)
router.post('/login', loginManual)

module.exports = router
