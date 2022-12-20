const layananPengaduanMasyarakat = require('../models/layananpengaduan')

exports.post = (req, res, next)=>{
    const image = req.file.path
    const header = req.body.header
    const paragraph = req.body.paragraph

    const post = new layananPengaduanMasyarakat({
        image: image,
        header: header,
        paragraph: paragraph,
        dataLaporan: []
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: `data layanan pengaduan masyarakat berhasil di post`,
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postDataLaporan = (req, res, next)=>{
    const _id = req.params._id

    const nama = req.body.nama
    const email = req.body.email
    const alamat = req.body.alamat
    const tempatKejadian = req.body.tempatKejadian
    const waktuKejadian = req.body.waktuKejadian
    const detailPengaduan = req.body.detailPengaduan
    const image = req.body.image
    const date = req.body.date

    const data = [{
        nama: nama,
        email: email,
        alamat: alamat,
        tempatKejadian: tempatKejadian,
        waktuKejadian: waktuKejadian,
        detailPengaduan: detailPengaduan,
        image: image,
        date: date
    }]

    layananPengaduanMasyarakat.updateOne(
        {_id: _id},
        {$push: {dataLaporan: {$each: data, $position: 0}}}
    )
    .then(result=>{
        res.status(201).json({
            message: 'data laporan layanan pengaduan masyarakat berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.get = (req, res, next)=>{
    let totalItems;

    layananPengaduanMasyarakat.find()
    .countDocuments()
        .then(count => {
            totalItems = count
            return layananPengaduanMasyarakat.find()
        })
        .then(result => {
            res.status(200).json({
                message: 'data layanan pengaduan masyarakat berhasil di dapatkan',
                data: result,
                total_data: totalItems
            })
        })
        .catch(err => {
            next(err)
        })
}