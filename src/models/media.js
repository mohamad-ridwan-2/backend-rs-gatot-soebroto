const mongoose = require('mongoose')

const Schema = mongoose.Schema

const media = new Schema({
    id: {
        type: String
    },
    image: {
        type: String
    },
    header: {
        type: String
    },
    paragraph:{
        type: String
    },
    data: {
        type: Array
    },
    date: {
        type: String
    },
    author: {
        type: String
    },
    path: {
        type : String
    },
    galeri: {
        type: Array
    },
    name: {
        type: String
    },
    linkVideo:{
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('media', media)