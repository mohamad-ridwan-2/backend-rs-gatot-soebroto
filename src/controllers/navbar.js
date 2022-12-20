const navbar = require('../models/navbar')

exports.postLogoWeb = (req, res, next)=>{
    const id = req.body.id
    const image = req.file.path

    const post = new navbar({
        id: id,
        image: image
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: 'logo web berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postMenuPage = (req, res, next)=>{
    const id = req.body.id
    const name = req.body.name
    const path = req.body.path

    const post = new navbar({
        id: id,
        name: name,
        path: path,
        menuCollapse: []
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: 'menu page berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postMenuCollapse = (req, res, next)=>{
    const _id = req.params._id

    const name = req.body.name
    const path = req.body.path

    const data = {
        name: name,
        path: path,
        menuChild: []
    }

    navbar.updateOne(
        {_id: _id},
        {$push: {menuCollapse: data}},
        {upsert: true}
    )
    .then(result=>{
        res.status(201).json({
            message: 'menu collapse berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postMenuChild = (req, res, next)=>{
    const _id = req.params._id
    const nameParams = req.params.name

    const name = req.body.name
    const path = req.body.path

    const data = {
        name: name,
        path: path
    }

    const updateDocument = {
        $push: {"menuCollapse.$[property].menuChild": data},
        upsert: true
    }

    const options = {
        arrayFilters: [
            {"property.name": nameParams}
        ]
    }

    navbar.updateOne({_id: _id}, updateDocument, options)
    .then(result=>{
        res.status(201).json({
            message: 'menu child berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postContactNavbar = (req, res, next)=>{
    const id = req.body.id
    const title = req.body.title
    const name = req.body.name
    const icon = req.body.icon
    const link = req.body.link

    const post = new navbar({
        id: id,
        title: title,
        name: name,
        icon: icon,
        link: link
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: 'contact navbar berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postPolling = (req, res, next)=>{
    const id = req.body.id
    const paragraph = req.body.paragraph
    
    const post = new navbar({
        id: id,
        paragraph: paragraph,
        dataPolling: []
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'data polling berhasil di post',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postDataPolling = (req, res, next)=>{
    const _id = req.params._id

    const nameDay = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
    const nameMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

    const years = new Date().getFullYear()
    const dateNow = new Date().getDate()
    const month = new Date().getMonth()
    const day = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

    const getHours = new Date().getHours()
    const hours = getHours.toString().length === 1 ? `0${getHours}` : getHours
    const getMinute = new Date().getMinutes()
    const minute = getMinute.toString().length === 1 ? `0${getMinute}` : getMinute

    const pendapat = req.body.pendapat
    const date = `${nameDay[day]}, ${dateNow} ${nameMonth[month]} ${years} ${hours}:${minute}`

    const data = [{
        pendapat: pendapat,
        date: date
    }]

    navbar.updateOne(
        {_id: _id},
        {$push: {dataPolling: {$each: data, $position: 0}}}
    )
    .then(result=>{
        res.status(201).json({
            message: 'pendapat data polling berhasil di post',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postCopyRight = (req, res, next)=>{
    const id = req.body.id
    const copyRight = req.body.copyRight
    const jumlahPengunjung = req.body.jumlahPengunjung

    const post = new navbar({
        id: id,
        copyRight: copyRight,
        jumlahPengunjung: jumlahPengunjung
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: `data copy right berhasil di post`,
                data: result
            })
        })
        .catch(err => console.log(err))    
}

exports.putCopyRight = (req, res, next)=>{
    const putId = req.params.putId
    const id = req.params.id

    const jumlahPengunjung = req.body.jumlahPengunjung
    const copyRight = req.body.copyRight

    navbar.findById(putId)
        .then(post=>{
            if(!post){
                const err = new Error('data tidak ada')
                err.errorStatus = 404;
                throw err;
            }
            
            if(id === 'jumlah-pengunjung'){
                post.jumlahPengunjung = jumlahPengunjung
            }else if(id === 'copy-right'){
                post.copyRight = copyRight
            }
    
            return post.save()
        })
        .then(result=>{
            res.status(201).json({
                message: `update ${id} berhasil`,
                data: result
            })
        })
        .catch(err=>next(err))
}

exports.get = (req, res, next)=>{
    let totalItems;

    navbar.find()
    .countDocuments()
        .then(count => {
            totalItems = count
            return navbar.find()
        })
        .then(result => {
            res.status(200).json({
                message: 'data navbar berhasil di dapatkan',
                data: result,
                total_data: totalItems
            })
        })
        .catch(err => {
            next(err)
        })
}