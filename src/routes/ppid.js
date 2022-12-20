const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/ppid')

router.post('/post/main-data', useControllers.postMainData)
router.post('/post/main-data/data/:_id', useControllers.postData)
router.post('/post/main-data/data/tentang-ppid/data/:_id/:id', useControllers.postDataTentangPPID)
router.get('/get', useControllers.get)

module.exports = router