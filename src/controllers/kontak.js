const kontak = require('../models/kontak')

exports.post = (req, res, next)=>{
    const image = req.file.path
    const header = req.body.header
    const paragraph = req.body.paragraph

    const post = new kontak({
        image: image,
        header: header,
        paragraph: paragraph,
        data: []
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: `data kontak berhasil di post`,
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postData = (req, res, next)=>{
    const _id = req.params._id

    const id = `${new Date().getTime()}`
    const nama = req.body.nama
    const email = req.body.email
    const pesan = req.body.pesan
    const date = req.body.date

    const data = [{
        id: id,
        nama: nama,
        email: email,
        pesan: pesan,
        date: date
    }]

    kontak.updateOne(
        {_id: _id},
        {$push: {data: {$each: data, $position: 0}}}
    )
    .then(result=>{
        res.status(201).json({
            message: 'data user kontak berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.get = (req, res, next)=>{
    let totalItems;

    kontak.find()
    .countDocuments()
        .then(count => {
            totalItems = count
            return kontak.find()
        })
        .then(result => {
            res.status(200).json({
                message: 'data kontak berhasil di dapatkan',
                data: result,
                total_data: totalItems
            })
        })
        .catch(err => {
            next(err)
        })
}