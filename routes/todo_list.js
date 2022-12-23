////form Routers ini di gunakan untuk mengisi table di models yang telah di buat di dalam database
const express = require('express')
const router = express.Router()
const todo_listModel = require('../models/todo_list')
const bcrypt = require('bcrypt')
const { DATEONLY, DATE, TIME } = require('sequelize')
// const noCheck = require('../utils/passwordCheck')
const todo_list = require('../models/todo_list')

// routing endpoint users utama
router.get('/', async(req, res) => {
    const todo_list = await todo_listModel.findAll()

    res.status(200).json({
        data: todo_list,
        metadata: "test todo list endpoint"
    })
})

router.post('/', async(req, res) => {
    const {Usernama, Judul,List, Date} = req.body
    
    const todo_list = await todo_listModel.create({
        Usernama,  Judul, List, Date 
    })
    res.status(200).json({
        data: todo_list,
        metadata: "Data Todo List di simpan"
    })
})

router.put('/', async(req, res) => {
    const {Usernama, Judul,List, Date} = req.body
   

    // if(!todo_list){
    //     const todo_list = await todo_listModel.update({
    //          List
    //     }, {where: { Usernama: Usernama } })

    //     res.status(200).json({
    //         todo_list: {updated: todo_list[0]},
    //         metadata:"user update!"
    //     })
    // } else {
    //     res.status(400).json({
    //         error: "data invalno"
    //     })
    // }

    const todo_list = await todo_listModel.findByPk(Usernama);

    if (!todo_list) {
        return res.json({message: 'Data not found'});
    }

    await todo_list.update({
         Judul, List, Date
    });    

    res.json({
        message: 'Data is Update'
    });
});



router.delete('/:Usernama', async(req,res) =>{
    const Usernama = req.params.Usernama;

    const todo_list = await todo_listModel.findOne(Usernama);

    if (!todo_list) {
        return res.json({message: 'Product not found'});
    }

    await todo_list.destroy();

    res.json({
        message: 'Product is deleted'
    });
});

// router.put('/', async(req, res) => {
//     const {no, Tanggal, List} = req.body
//     const check = await passwordCheck(no, password)
//     const encryptedPassword = await bcrypt.hash(passwordBaru, 10)

//     if(check.compare === true){
//         const users = await UsersModel.update({
//             nama, password: encryptedPassword
//         }, {where: { no: no } })

//         res.status(200).json({
//             users: {updated: users[0]},
//             metadata:"user update!"
//         })
//     } else {
//         res.status(400).json({
//             error: "data invalno"
//         })
//     }
// })

router.post('/', async(req, res) => {
    const {Usernama} = req.body
    const todo_list = await todo_listModel.create({
        Usernama: Usernama, status: 'Selesai'
    })

    res.status(200).json({
        data: todo_list,
        metadata: "checkin berhasil"
    })
})

router.post('/checkout', async(req, res) => {
    const {Usernama} = req.body
    const todo_list = await todo_listModel.create({
        Usernama: Usernama, status: 'Belum Selesai'
    })

    res.status(200).json({
        data: todo_list,
        metadata: "checkout berhasil"
    })
})


module.exports = router