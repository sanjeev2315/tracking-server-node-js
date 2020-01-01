require('./models/Users')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = 'mongodb://localhost:27017/admin'

mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true
})

mongoose.connection.on('connected', () => {
	console.log('Connected to Mongo DB')
})

mongoose.connection.on('error', (err) => {
	console.error('Error in connection with DB- ', err)
})

// app.get('/', requireAuth, (req, res) => {
// 	res.send(`Your email is ${req.user.email}`)
// })

app.listen(3000, () => {
	console.log('Running express on 3000')
})