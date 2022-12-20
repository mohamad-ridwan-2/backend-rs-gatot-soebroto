const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const multer = require('multer')

const app = express()

app.use(cors())

dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const navbarRoutes = require('./src/routes/navbar')
const homeRoutes = require('./src/routes/home')
const tentangRoutes = require('./src/routes/tentang')
const layananRoutes = require('./src/routes/layanan')
const beritaRoutes = require('./src/routes/berita')
const mediaRoutes = require('./src/routes/media')
const zonaIntegritasRoutes = require('./src/routes/zonaintegritas')
const layananPengaduanRoutes = require('./src/routes/layananpengaduan')
const ppidRoutes = require('./src/routes/ppid')
const kontakRoutes = require('./src/routes/kontak')
 
const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images')
    },
    filename: (req, file, cb)=>{
        cb(null, `${new Date().getTime()}` + '-' + file.originalname)
    }
})

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage}).single('image'))

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Credential", "true")
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next()
})

app.use('/v1/navbar', navbarRoutes)
app.use('/v2/home', homeRoutes)
app.use('/v3/tentang', tentangRoutes)
app.use('/v4/layanan', layananRoutes)
app.use('/v5/berita', beritaRoutes)
app.use('/v6/media', mediaRoutes)
app.use('/v7/zona-integritas', zonaIntegritasRoutes)
app.use('/v8/layanan-pengaduan-masyarakat', layananPengaduanRoutes)
app.use('/v9/ppid', ppidRoutes)
app.use('/v10/kontak', kontakRoutes)

app.use((error, req, res, next)=>{
    const status = error.errorStatus || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data})
})

const uri = process.env.MONGO_DB_URI

const PORT = process.env.PORT || 6500

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.once('open', ()=>{
    console.log("MongoDB database connection has been established successfully.")
})

// Listener
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})