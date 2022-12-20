const layanan = require('../models/layanan')

exports.postData = (req, res, next)=>{
    const _id = req.params._id
    const id = req.body.id
    const image = req.file.path
    const header = req.body.header
    const paragraph = req.body.paragraph
    const path = req.body.path

    if(_id === "data-card"){
        const post = new layanan({
            id: id,
            image: image,
            header: header,
            paragraph: paragraph,
            path: path,
            data: []
        })

        submit(post, "data card")
    }else if(_id === "non-data-card"){
        const post = new layanan({
            id: id,
            image: image,
            header: header,
            paragraph: paragraph,
            path: path
        })

        submit(post, "non data card")
    }
    

    function submit(data, message){
        data.save()
        .then(result=>{
            res.status(201).json({
                message: `${message} page ${id} berhasil di post`,
                data: result
            })
        })
        .catch(err=>console.log(err))
    }
}

exports.postCard = (req, res, next)=>{
    const _id = req.params._id
    const id = req.params.id

    const image = req.file.path
    const header = req.body.header
    const icon = req.body.icon
    const path = req.body.path
    const paragraph = req.body.paragraph

    const data = {
        image: image,
        header: header,
        icon: icon,
        path: path,
        paragraph: paragraph,
    }

    layanan.updateOne(
        {_id: _id},
        {$push: {data: data}},
        {upsert: true}
    )
    .then(result=>{
        res.status(201).json({
            message: `data card page ${id} berhasil di post`,
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postJadwalDokter = (req, res, next)=>{
    const _id = req.params._id

    const id = `${new Date().getTime()}`
    const nama = req.body.nama
    const lokasi = req.body.lokasi
    const poli = req.body.poli
    const subPoli = req.body.subPoli

    const data = {
        id: id,
        nama: nama,
        lokasi: lokasi,
        poli: poli,
        subPoli: subPoli
    }

    layanan.updateOne(
        {_id: _id},
        {$push: {data: data}},
        {upsert: true}
    )
    .then(result=>{
        res.status(201).json({
            message: `data dokter berhasil di post`,
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.get = (req, res, next)=>{
    let totalItems;

    layanan.find()
    .countDocuments()
        .then(count => {
            totalItems = count
            return layanan.find()
        })
        .then(result => {
            res.status(200).json({
                message: 'data layanan berhasil di dapatkan',
                data: result,
                total_data: totalItems
            })
        })
        .catch(err => {
            next(err)
        })
}