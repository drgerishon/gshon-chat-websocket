const express = require('express')
const { regsiterUser, loginUser, setAvatar, allUsers, logout } = require('../controllers/auth.controller')

const router = express.Router()

router.post("/register", regsiterUser)
router.post("/login", loginUser)
router.post("/setavatar/:id", setAvatar);
router.get("/allusers/:id", allUsers);
router.get("/logout/:id", logout);



module.exports = router