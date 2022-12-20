const berita = require('../models/berita')

exports.postMainData = (req, res, next) => {
    const image = req.file.path
    const header = req.body.header
    const paragraph = req.body.paragraph

    const post = new berita({
        image: image,
        header: header,
        paragraph: paragraph,
        data: []
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'main data berita berhasil di post',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postData = (req, res, next) => {
    const _id = req.params._id

    const nameDay = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
    const nameMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

    const years = new Date().getFullYear()
    const dateNow = new Date().getDate()
    const month = new Date().getMonth()
    const day = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

    const id = `${new Date().getTime()}`
    const image = req.file.path
    const header = req.body.header
    const date = `${nameDay[day]}, ${dateNow} ${nameMonth[month]} ${years}`
    const author = 'Administrator'
    const path = req.body.path
    const paragraph = req.body.paragraph

    const data = [{
        id: id,
        image: image,
        header: header,
        date: date,
        author: author,
        path: path,
        paragraph: paragraph,
        galeriFoto: []
    }]

    berita.updateOne(
        { _id: _id },
        { $push: { data: { $each: data, $position: 0 } } }
    )
        .then(result => {
            res.status(201).json({
                message: 'data berita berhasil di post',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postGaleriFoto = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id

    const image = req.file
    const name = image.filename.split('.')[0]

    const data = {
        image: image.path,
        name: name
    }

    const updateDocument = {
        $push: { "data.$[property].galeriFoto": data }
    }

    const options = {
        arrayFilters: [
            { "property.id": id }
        ]
    }

    berita.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'galeri foto berhasil di post',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.get = (req, res, next)=>{
    let totalItems;

    berita.find()
    .countDocuments()
        .then(count => {
            totalItems = count
            return berita.find()
        })
        .then(result => {
            res.status(200).json({
                message: 'data berita berhasil di dapatkan',
                data: result,
                total_data: totalItems
            })
        })
        .catch(err => {
            next(err)
        })
}