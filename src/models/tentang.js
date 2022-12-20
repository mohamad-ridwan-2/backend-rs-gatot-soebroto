const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tentang = new Schema({
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
    paragraphUtama: {
        type: String
    },
    paragraphDetail: {
        type: String
    },
    path: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('tentang', tentang)