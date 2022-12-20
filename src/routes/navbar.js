const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/navbar')

router.post('/post/logo-web', useControllers.postLogoWeb)
router.post('/post/menu-page', useControllers.postMenuPage)
router.post('/post/menu-page/menu-collapse/:_id', useControllers.postMenuCollapse)
router.post('/post/menu-page/menu-collapse/menu-child/:_id/:name', useControllers.postMenuChild)
router.post('/post/contact-navbar', useControllers.postContactNavbar)
router.post('/post/polling', useControllers.postPolling)
router.post('/post/polling/data-polling/:_id', useControllers.postDataPolling)
router.post('/post/copy-right', useControllers.postCopyRight)
router.put('/put/copy-right/:putId/:id', useControllers.putCopyRight)
router.get('/get', useControllers.get)

module.exports = router