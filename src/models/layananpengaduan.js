const mongoose = require('mongoose')

const Schema = mongoose.Schema

const layananPengaduanMasyarakat = new Schema({
    image: {
        type: String
    },
    header: {
        type: String
    },
    paragraph: {
        type: String
    },
    dataLaporan: {
        type: Array
    },
    nama: {
        type: String
    },
    email:{
        type: String
    },
    alamat: {
        type: String
    },
    tempatKejadian:{
        type: String
    },
    waktuKejadian:{
        type: String
    },
    detailPengaduan: {
        type: String
    },
    date: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('layanan-pengaduan-masyarakat', layananPengaduanMasyarakat)