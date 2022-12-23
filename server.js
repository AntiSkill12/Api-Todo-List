const express = require('express')
const cors = require('cors')

const port = 3300

const sequelize = require('./db.config')
sequelize.sync().then(() => console.log('database ready'))

const usersEndpoint = require('./routes/users')
const todo_listEndpoint = require('./routes/todo_list')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', usersEndpoint)
app.use('/todo_list', todo_listEndpoint)

app.listen(port, () => console.log(`running server on port ${port}`));