const express = require('express')
const upload = require('../Controllers/Multer')
const { UserRegistration, Login, Getdata, Edituser, getoneuser, Deleteuser } = require('../Controllers/auth.controller')





const router = express.Router()


router.post('/registration', upload.single('profilePicture'), UserRegistration)
router.post('/login', Login)
router.get('/getdata', Getdata)
router.put('/edituser/:id', Edituser)
router.get('/getoneuser/:id', getoneuser)
router.delete('/deleteuser/:id', Deleteuser)









module.exports = router