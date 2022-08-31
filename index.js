const express = require('express')
const db = require('./config/connection')
const routes = require('./routes')
const cwd = process.cwd()
const app = express()
const port = process.env.port || 3001

app.use(express.urlencoded({ extended: true}))
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello world!')
})


app.use(routes)


db.once('open', () => {
    app.listen(port, () => {
        console.log(`API running on http://localhost:${port}/`)
    })
})
