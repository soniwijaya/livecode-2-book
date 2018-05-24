const router = require('express').Router(),
images = require('../helpers/images')

const {
   authentication
} = require('../middlewares/auth')

const {
    getAll,
    getAllUser,
    getSingle,
    createBook,
    deleteBook
  } = require('../controllers/book.controller')

router.get('/', getAll)
router.get('/:idBook', getSingle)
router.get('/view/book', getAllUser)
router.post('/', authentication, images.multer.single('image'), images.sendUploadToGCS, createBook)
router.delete('/:idBook', authentication, deleteBook)

module.exports = router

