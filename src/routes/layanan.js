const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/layanan')

router.post('/post/:_id', useControllers.postData)
router.post('/post/card/data/:_id/:id', useControllers.postCard)
router.post('/post/jadwal-dokter/:_id', useControllers.postJadwalDokter)
router.get('/get', useControllers.get)

module.exports = router