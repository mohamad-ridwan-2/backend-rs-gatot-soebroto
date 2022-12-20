const mongoose = require('mongoose')

const Schema = mongoose.Schema

const navbar = new Schema({
    id: {
        type: String
    },
    image: {
        type: String
    },
    path: {
        type: String
    },
    menuCollapse:{
        type: Array
    },
    name: {
        type: String
    },
    menuChild: {
        type: Array
    },
    icon: {
        type: String
    },
    title: {
        type: String
    },
    link:{
        type: String
    },
    paragraph: {
        type: String
    },
    dataPolling: {
        type: Array
    },
    date: {
        type: String
    },
    copyRight:{
        type: String
    },
    jumlahPengunjung: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('navbar', navbar)