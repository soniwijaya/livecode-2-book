const router = require('express').Router()

const {
  authentication
} = require('../middlewares/auth')

const {
  addDoc,
  showDoc,
  detailDoc,
  deleteDoc
} = require('../controllers/ulasan.controller')

router.get('/', showDoc)
router.post('/', authentication, addDoc)
router.get('/:id', authentication, detailDoc)
router.delete('/:id', authentication, deleteDoc)

module.exports = router
