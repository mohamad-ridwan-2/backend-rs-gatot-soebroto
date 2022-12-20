const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/layananpengaduan')

router.post('/post', useControllers.post)
router.post('/post/data-laporan/:_id', useControllers.postDataLaporan)
router.get('/get', useControllers.get)

module.exports = router