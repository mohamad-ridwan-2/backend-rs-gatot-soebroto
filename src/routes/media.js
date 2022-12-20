const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/media')

router.post('/post/main-data', useControllers.postMainData)
router.post('/post/main-data/foto/data/:_id', useControllers.postDataFoto)
router.post('/post/main-data/foto/data/galeri/:_id/:id', useControllers.postGaleriFoto)
router.post('/post/main-data/video/data/:_id', useControllers.postDataVideo)
router.post('/post/main-data/publikasi/data/:_id', useControllers.postDataPublikasi)
router.post('/post/main-data/publikasi/data/galeri/:_id/:id', useControllers.postGaleriPublikasi)
router.get('/get', useControllers.get)

module.exports = router