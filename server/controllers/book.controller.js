const Books = require('../models/book.model')
const Users = require('../models/user.model')

const Storage = require('@google-cloud/storage')

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    keyFilename: process.env.KEYFILE_PATH
})

const bucket = storage.bucket(process.env.CLOUD_BUCKET)

module.exports = {

    getAll ( req , res ) {
        Books.find().populate('user')
        .then( function (book) {
            res.status(200).json({
                message: 'Success get all book',
                data: book
            })
        })
        .catch (function (err) {
            res.status(400).json({
                message: 'Failed get data',
                data: err
            })
        })
    },

    getAllUser ( req , res ) {
        Users.findById(req.headers.id).populate('book')
        .then( function (book) {
            res.status(200).json({
                message: 'Success get all book',
                data: book
            })
        })
        .catch (function (err) {
            res.status(400).json({
                message: 'Failed get data',
                data: err
            })
        })
    },

    getSingle ( req , res ){
        Books.findById(req.params.idBook).populate('user')
        .then( function (book) {
            res.status(200).json({
                message: 'Success get single book',
                data: book
            })
        })
        .catch (function (err) {
            res.status(400).json({
                message: 'Failed get data',
                data: err
            })
        })
    },

    createBook ( req , res ){

        const {
            judul,
            penerbit,
            penulis,
            content
        } = req.body

        Books.create(
            {
                user: req.headers.id,
                judul,
                penerbit,
                penulis,
                content,
                image: req.file.cloudStoragePublicUrl
            }
        )
        .then(function (booklist) {
            Users.findById(req.headers.id)
            .then(function (user) {
                
                user.book.push(booklist._id)
                Users.findByIdAndUpdate(user._id, {book: user.book})
                .then(function() {
                    res.status(200).json({
                        message: 'Success Add book',
                        data: booklist,
                    })
                })
                .catch(function(err) {
                    res.status(400).json({
                        message: 'Failed add book',
                        data: err
                    })
                })
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Failed add book',
                data: err
            })
        })
    },

    deleteBook ( req , res ){
        Books.findByIdAndRemove(req.params.idBook)
        .then( removeBook => {
            let fileName = removeBook.image.substr(removeBook.image.lastIndexOf('/')+1)
            bucket.file(fileName).delete()
            res.status(200).json({
                message: 'Success Delete',
                data: removeBook
            })
        })
        .catch( err => {
            res.status(400).json({
                message: 'Fail to Delete',
                data: err
            })
        })
    }
}