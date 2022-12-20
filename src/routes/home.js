const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/home')

router.post('/post/carousel', useControllers.postCarousel)
router.post('/post/jajaran-pimpinan', useControllers.postJajaranPimpinan)
router.post('/post/jajaran-pimpinan/data-pimpinan/:_id', useControllers.postDataPimpinan)
router.post('/post/testimoni', useControllers.postTestimoni)
router.post('/post/testimoni/komentar/:_id', useControllers.postKomentar)
router.post('/post/media-home', useControllers.postMediaHome)
router.post('/post/banner-video', useControllers.postBannerVideo)
router.get('/get', useControllers.get)

module.exports = router