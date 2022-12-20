const mongoose = require('mongoose')

const Schema = mongoose.Schema

const kontak = new Schema({
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
    nama:{
        type: String
    },
    email: {
        type: String
    },
    pesan:{
        type: String
    },
    date: {
        type: String
    },
    id: {
        type :String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('kontak', kontak)