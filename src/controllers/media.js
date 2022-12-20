const media = require('../models/media')

exports.postMainData = (req, res, next) => {
    const id = req.body.id
    const image = req.file.path
    const header = req.body.header
    const path = req.body.path

    const post = new media({
        id: id,
        image: image,
        header: header,
        path: path,
        data: []
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: `main data media ${id} berhasil di post`,
                data: result
            })
        })
        .catch(err => console.log(err))
}

// FOTO
exports.postDataFoto = (req, res, next)=>{
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

    const data = [{
        id: id,
        image: image,
        header: header,
        date: date,
        author: author,
        path: path,
        galeri: []
    }]

    media.updateOne(
        { _id: _id },
        { $push: { data: { $each: data, $position: 0 } } }
    )
        .then(result => {
            res.status(201).json({
                message: `data media galeri-foto berhasil di post`,
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
        $push: { "data.$[property].galeri": data }
    }

    const options = {
        arrayFilters: [
            { "property.id": id }
        ]
    }

    media.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'galeri foto berhasil di post',
                data: result
            })
        })
        .catch(err => console.log(err))
}

// video
exports.postDataVideo = (req, res, next)=>{
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
    const linkVideo = req.body.linkVideo
    const path = req.body.path
    const paragraph = req.body.paragraph

    const data = [{
        id: id,
        image: image,
        header: header,
        date: date,
        author: author,
        linkVideo: linkVideo,
        path: path,
        paragraph: paragraph
    }]

    media.updateOne(
        { _id: _id },
        { $push: { data: { $each: data, $position: 0 } } }
    )
        .then(result => {
            res.status(201).json({
                message: `data media galeri-video berhasil di post`,
                data: result
            })
        })
        .catch(err => console.log(err))
}

// publikasi
exports.postDataPublikasi = (req, res, next)=>{
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

    const data = [{
        id: id,
        image: image,
        header: header,
        date: date,
        author: author,
        galeri: []
    }]

    media.updateOne(
        { _id: _id },
        { $push: { data: { $each: data, $position: 0 } } }
    )
        .then(result => {
            res.status(201).json({
                message: `data media galeri-publikasi berhasil di post`,
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postGaleriPublikasi = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id

    const image = req.file
    const name = image.filename.split('.')[0]

    const data = {
        image: image.path,
        name: name
    }

    const updateDocument = {
        $push: { "data.$[property].galeri": data }
    }

    const options = {
        arrayFilters: [
            { "property.id": id }
        ]
    }

    media.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'galeri publikasi berhasil di post',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.get = (req, res, next)=>{
    let totalItems;

    media.find()
    .countDocuments()
        .then(count => {
            totalItems = count
            return media.find()
        })
        .then(result => {
            res.status(200).json({
                message: 'data media berhasil di dapatkan',
                data: result,
                total_data: totalItems
            })
        })
        .catch(err => {
            next(err)
        })
}