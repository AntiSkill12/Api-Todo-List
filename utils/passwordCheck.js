// berfungsi mempersingkat codingan yang di butukan dan sama

const bcrypt = require('bcrypt')
const { Model } = require('sequelize')
const UsersModel = require('../models/users')
// const todo_listModel = require('../models/todo_list')

const passwordCheck = async (username, password) => {
    const userData = await UsersModel.findOne({where: {username: username}} )
    const compare = await bcrypt.compare(password, userData.password)
    return {compare, userData}
}

module.exports = passwordCheck