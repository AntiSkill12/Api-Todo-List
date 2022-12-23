//form Models ini di gunakan untuk membuat table di dalam database
const { Model, DataTypes} = require('sequelize')
const sequelize = require('../db.config')
class todo_list extends Model { }

todo_list.init({
    Usernama: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Judul:{
        type: DataTypes.STRING
    },
    List: {
        type: DataTypes.STRING
    },
    Date: {
        type: DataTypes.DATEONLY('DD-MM-YY')
    },
    status: {
        type: DataTypes.ENUM('Selesai', 'Belum Selesai')
    }
}, {
    sequelize,
    modelName: 'todo_list'
})

module.exports = todo_list