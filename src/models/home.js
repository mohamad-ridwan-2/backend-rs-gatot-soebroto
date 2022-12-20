const mongoose = require('mongoose')

const Schema = mongoose.Schema

const home = new Schema({
    id: {
        type: String
    },
    image: {
        type: String
    },
    title: {
        type: String
    },
    paragraph: {
        type: String
    },
    dataPimpinan: {
        type: Array
    },
    komentar: {
        type: Array
    },
    name: {
        type: String
    },
    country: {
        type: String
    },
    message: {
        type: String
    },
    icon: {
        type: String
    },
    link: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('home', home)