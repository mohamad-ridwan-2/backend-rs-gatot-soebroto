const tentang = require('../models/tentang')

exports.postData = (req, res, next)=>{
    const id = req.body.id
    const image = req.file.path
    const header = req.body.header
    const paragraph = req.body.paragraph
    const path = req.body.path

    const post = new tentang({
        id: id,
        image: image,
        header: header,
        paragraph: paragraph,
        path: path
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: `data page ${id} berhasil di post`,
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postDataSelayangPandang = (req, res, next)=>{
    const id = req.body.id
    const image = req.file.path
    const header = req.body.header
    const paragraphUtama = req.body.paragraphUtama
    const paragraphDetail = req.body.paragraphDetail
    const path = req.body.path

    const post = new tentang({
        id: id,
        image: image,
        header: header,
        paragraphUtama: paragraphUtama,
        paragraphDetail: paragraphDetail,
        path: path
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: `data page selayang pandang berhasil di post`,
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.get = (req, res, next)=>{
    let totalItems;

    tentang.find()
    .countDocuments()
        .then(count => {
            totalItems = count
            return tentang.find()
        })
        .then(result => {
            res.status(200).json({
                message: 'data tenteng berhasil di dapatkan',
                data: result,
                total_data: totalItems
            })
        })
        .catch(err => {
            next(err)
        })
}