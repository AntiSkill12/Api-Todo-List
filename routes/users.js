const express = require('express')
// const { where } = require('sequelize')
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')
const passwordCheck = require('../utils/passwordCheck')

// routing endpoint users utama
router.get('/', async(req, res) => {
    const users = await UsersModel.findAll()

    res.status(200).json({
        data: users,
        metadata: "test user endpoint"
    })
})


router.post('/', async(req, res) => {
    //no, nama, password ->>>>>>>> BE nangkap
    const { username, nama, password} = req.body
    
    const encryptedPassword = await bcrypt.hash(password, 10)


    const users = await UsersModel.create({
        username, nama, password: encryptedPassword
    })
    res.status(200).json({
        data: users,
        metadata: "test user endpoint"
    })
})

router.put('/', async(req, res) => {
    //no, nama, password ->>>>>>>> BE nangkap
    const { username, nama, password, passwordBaru} = req.body

    const check = await passwordCheck(username, password)

    // const compare = await bcrypt.compare(password, userData.password)
    const encryptedPassword = await bcrypt.hash(passwordBaru, 10)
    // res.json({compare})

    // password yang muncul di db === password dari inputan
    if(check.compare === true){
        const users = await UsersModel.update({
            username, nama, password: encryptedPassword
        }, {where: { username: username } })

        res.status(200).json({
            users: {updated: users[0]},
            metadata:"user update!"
        })
    } else {
        res.status(400).json({
            error: "data invalno"
        })
    }
})

router.delete('/:username', async(req,res) =>{
    const username = req.params.username;

    const users = await UsersModel.findByPk(username);

    if (!users) {
        return res.json({message: 'Product not found'});
    }

    await users.destroy();

    res.json({
        message: 'Product is deleted'
    });
});


// router.delete('/', async(req, res) => {
//     const {no} = req.body
    
//     const check = await passwordCheck(no)

//     if(check.compare === true){
//         const users = await UsersModel.destroy();
//         res.status(200).json({
//             users: {updated: users[0]},
//             metadata:"Data User is Deleted"
//         })
//         res.status(400).json({
//             error: "data invalno"
//         })
//     }
// })

//Login
router.post('/login', async (req, res) => {
    const {username, password} = req.body

    const check = await passwordCheck(username, password)
    if(check.compare === true){
        res.status(200).json({
            status: 200,
            data: check.userData,
            metadata:"login sukses"
        })
    } else
    res.status(400).json({
        data:null,
        metadata:"data invalno"
    })
})

module.exports = router