const ppid = require('../models/ppid')

exports.postMainData = (req, res, next)=>{
    const image = req.file.path
    const header = req.body.header
    const path = req.body.path
    const paragraph = req.body.paragraph

    const post = new ppid({
        image: image,
        header: header,
        path: path,
        paragraph: paragraph,
        data: []
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: `main data ppid berhasil di post`,
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postData = (req, res, next)=>{
    const _id = req.params._id

    const id = req.body.id
    const image = req.file.path
    const header = req.body.header
    const path = req.body.path
    const paragraph = req.body.paragraph

    const data = {
        id: id,
        image: image,
        header: header,
        path: path,
        paragraph: paragraph,
        data: []
    }

    ppid.updateOne(
        {_id: _id},
        {$push: {data: data}},
        {upsert: true}
    )
    .then(result=>{
        res.status(201).json({
            message: 'data array ppid berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postDataTentangPPID = (req, res, next)=>{
    const _id = req.params._id
    const id = req.params.id

    const newId = req.body.id
    const image = req.file.path
    const header = req.body.header
    const path = req.body.path
    const paragraph = req.body.paragraph

    const data = {
        id: newId,
        image: image,
        header: header,
        path: path,
        paragraph: paragraph
    }

    const updateDocument = {
        $push: { "data.$[property].data": data }
    }

    const options = {
        arrayFilters: [
            { "property.id": id }
        ]
    }

    ppid.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: `data tentang ppid page ${newId} berhasil di post`,
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.get = (req, res, next)=>{
    let totalItems;

    ppid.find()
    .countDocuments()
        .then(count => {
            totalItems = count
            return ppid.find()
        })
        .then(result => {
            res.status(200).json({
                message: 'data ppid berhasil di dapatkan',
                data: result,
                total_data: totalItems
            })
        })
        .catch(err => {
            next(err)
        })
}