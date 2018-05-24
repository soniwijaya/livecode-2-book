const mongoose = require('mongoose')
const Schema = mongoose.Schema

let bookSchema = new Schema({

        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
        judul: {
            type: String,
            default: 'no judul'
        },
        penerbit: {
            type: String,
            default: 'no penerbit'
        },
        penulis: {
            type: String,
            default: 'no penulis'
        },
        content: {
            type: String
        },
        image: {
            type: String
        },
        ulasan: [{
            type: Schema.Types.ObjectId,
            ref: 'ulasans'
        }]
    }
    ,{
        timestamps:true
    }
)

let Books = mongoose.model('books', bookSchema);

module.exports = Books