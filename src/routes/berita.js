const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/berita')

router.post('/post/main-data', useControllers.postMainData)
router.post('/post/main-data/data/:_id', useControllers.postData)
router.post('/post/main-data/data/galeri-foto/:_id/:id', useControllers.postGaleriFoto)
router.get('/get', useControllers.get)

module.exports = router