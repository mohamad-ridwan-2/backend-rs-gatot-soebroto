const mongoose = require('mongoose')

const Schema = mongoose.Schema

const layanan = new Schema({
    id:{
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
    path: {
        type: String
    },
    data: {
        type: Array
    },
    icon: {
        type: String
    },
    nama: {
        type: String
    },
    lokasi: {
        type: String
    },
    poli: {
        type: String
    },
    subPoli: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('layanan', layanan)