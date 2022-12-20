const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/kontak')

router.post('/post', useControllers.post)
router.post('/post/data/:_id', useControllers.postData)
router.get('/get', useControllers.get)

module.exports = router