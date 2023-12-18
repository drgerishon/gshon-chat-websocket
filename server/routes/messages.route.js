const express = require('express')
const { addMessage, getAllMessage } = require('../controllers/message.controller')

const router = express.Router()

router.post("/addmsg", addMessage)
router.post("/getmsg", getAllMessage)




module.exports = router