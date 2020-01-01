const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')

router.post('/signup', async (req, res) => {
	try {
		const { email, password } = req.body
		const user = new User({ email, password })
		await user.save()
		const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
		res.send({ token })
	}
	catch (err) {
		res.status(422).send(err.message)
	}

});

router.post('/signin', async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		res.status(422).send({ error: "Email and Password are mandatory" })
	}
	const user = await User.findOne({ email })
	if (!user) {
		res.status(422).send({ error: "Email Not found" })
	}
	try {
		await user.comparePassword(password)
		const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
		res.send({ token })
	}
	catch (err) {
		res.status(422).send({ error: "Email Not found" })
	}

})

module.exports = router