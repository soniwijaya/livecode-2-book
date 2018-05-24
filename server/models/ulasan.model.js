const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ulasanSchema = new Schema({

        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        book: {
            type: Schema.Types.ObjectId,
            ref: 'books'
        },
        ulasan:{type: String, minlength:1, required: true},
    }
    ,{
        timestamps:true
    }
)

let Ulasans = mongoose.model('ulasans', ulasanSchema);

module.exports = Ulasans