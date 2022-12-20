const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ppid = new Schema({
    id: {
        type: String
    },
    image: {
        type: String
    },
    header: {
        type: String
    },
    path: {
        type: String
    },
    paragraph: {
        type: String
    },
    data: {
        type: Array
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('ppid', ppid)