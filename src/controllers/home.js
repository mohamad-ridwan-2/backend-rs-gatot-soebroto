const home = require('../models/home')

exports.postCarousel = (req, res, next)=>{
    const id = req.body.id
    const image = req.file.path

    const post = new home({
        id: id,
        image: image
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: 'carousel home berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postJajaranPimpinan = (req, res, next)=>{
    const id = req.body.id
    const title = req.body.title
    const paragraph = req.body.paragraph
    
    const post = new home({
        id: id,
        title: title,
        paragraph: paragraph,
        dataPimpinan: []
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: 'jajaran pimpinan berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postDataPimpinan = (req, res, next)=>{
    const _id = req.params._id
    
    const image = req.file.path
    const jabatan = req.body.jabatan
    const pangkat = req.body.pangkat
    const gelar = req.body.gelar

    const data = {
        image: image,
        jabatan: jabatan,
        pangkat: pangkat,
        gelar: gelar
    }

    home.updateOne(
        {_id: _id},
        {$push: {dataPimpinan: data}},
        {upsert: true}
    )
    .then(result=>{
        res.status(201).json({
            message: 'data pimpinan berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postTestimoni = (req, res, next)=>{
    const id = req.body.id
    const title = req.body.title
    const paragraph = req.body.paragraph
    
    const post = new home({
        id: id,
        title: title,
        paragraph: paragraph,
        komentar: []
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: 'testimoni berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postKomentar = (req, res, next)=>{
    const _id = req.params._id

    const name = req.body.name
    const country = req.body.country
    const message = req.body.message
    const icon = req.body.icon

    const data = {
        name: name,
        country: country,
        message: message,
        icon: icon
    }

    home.updateOne(
        {_id: _id},
        {$push: {komentar: data}},
        {upsert: true}
    )
    .then(result=>{
        res.status(201).json({
            message: 'komentar berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postMediaHome = (req, res, next)=>{
    const id = req.body.id
    const title = req.body.title
    const paragraph = req.body.paragraph
    const image = req.file.path
    const link = req.body.link
    
    const post = new home({
        id: id,
        title: title,
        paragraph: paragraph,
        image: image,
        link: link
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: 'media home berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postBannerVideo = (req, res, next)=>{
    const id = req.body.id
    const link = req.body.link

    const post = new home({
        id: id,
        link: link
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: 'banner video berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.get = (req, res, next)=>{
    let totalItems;

    home.find()
    .countDocuments()
        .then(count => {
            totalItems = count
            return home.find()
        })
        .then(result => {
            res.status(200).json({
                message: 'data home berhasil di dapatkan',
                data: result,
                total_data: totalItems
            })
        })
        .catch(err => {
            next(err)
        })
}