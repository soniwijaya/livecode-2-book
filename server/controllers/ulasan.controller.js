const Book = require('../models/book.model')
const User = require('../models/user.model')
const Ulasan = require('../models/ulasan.model')

module.exports = {
  AddUlasan(req, res) {
    Ulasan.create(req.body)
      .then((result) => {
        User.findByIdAndUpdate(userId,
          {
            $push: {
              reviews: result._id
            }
          }
        )
          .exec()
          .then(user => {
            Book.findByIdAndUpdate(bookId,
              {
                $push: {
                  reviews: result._id
                }
              }
            )
              .exec()
              .then(book => {
                res.status(200).json({
                  message: 'success',
                  result
                })
              })
          })
      }).catch((err) => {
        res.status(400).json({
          message: 'failed',
          err
        })
      });
  },
  showUlasan(req, res) {
    Book.find()
      .populate('userId')
      .populate('bookId')
      .exec()
      .then((result) => {
        res.status(200).json({
          message: 'success',
          result
        })
      }).catch((err) => {
        res.status(400).json({
          message: 'failed',
          err
        })
      });
  },
  detailUlasan(req, res) {
    Ulasan.findById(req.params.id)
      .populate('userId')
      .populate('bookId')
      .exec()
      .then((result) => {
        res.status(200).json({
          message: 'success',
          result
        })
      }).catch((err) => {
        res.status(400).json({
          message: 'failed',
          err
        })
      });
  },
  deleteUlasan(req, res) {
    Ulasan.findByIdAndRemove(req.params.id)
      .exec()
      .then((result) => {
        User.findByIdAndUpdate(result.userId, {
          $pull: {
            reviews: result._id
          }
        })
          .then(user => {
            Book.findByIdAndUpdate(result.bookId, {
              $pull: {
                reviews: result._id
              }
            })
              .exec()
              .then(answer => {
                res.status(200).json({
                  message: 'success',
                  result
                })
              })
          })
      }).catch((err) => {
        res.status(400).json({
          message: 'failed',
          err
        })
      });
  }
}