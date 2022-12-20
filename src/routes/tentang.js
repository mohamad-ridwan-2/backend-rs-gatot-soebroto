const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/tentang')

router.post('/post/data', useControllers.postData)
router.post('/post/data/selayang-pandang', useControllers.postDataSelayangPandang)
router.get('/get', useControllers.get)

module.exports = router