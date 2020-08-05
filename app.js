const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const app = express();
const main = require('./views/main')
const models = require('./models');
const { Sequelize } = require('sequelize');
const { Console } = require('console');
const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

app.use(morgan('dev'));

app.use('/wiki', wikiRouter)
app.use('/user', userRouter)

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
    res.send(main())
})

const PORT = 3000


const init = async () => {
    await models.db.sync()
    models.db.sync({force: true})
    app.listen(PORT, () => {
        console.log(`Sever is running on ${PORT}`)
    })
}

init()

