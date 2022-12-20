const mongoose = require('mongoose')

const Schema = mongoose.Schema

const berita = new Schema({
    image: {
        type: String
    },
    header: {
        type: String
    },
    paragraph: {
        type: String
    },
    data: {
        type: Array
    },
    id: {
        type: String
    },
    date: {
        type: String
    },
    author: {
        type: String
    },
    path: {
        type: String
    },
    galeriFoto: {
        type: Array
    },
    name: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('berita', berita)