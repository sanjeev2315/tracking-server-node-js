const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireAuth = require('./../middleware/requireAuth')
const Track = mongoose.model('Track')
router.use(requireAuth)

router.get('/tracks', async (req, res) => {
	const tracks = await Track.find({ userId: req.user._id })
	res.send(tracks)
})

router.post('/tracks', async (req, res) => {
	const { name, locations } = req.body
	if (!name || !locations) {
		return res.status(422).send({ error: 'You must provide a name and locations' })
	}
	try {
		const track = new Track({ name, locations, userId: req.user._id })
		console.log('track', track)
		await track.save()
		res.send({ track })
	} catch (error) {
		console.log('err', error)
		return res.status(422).send({ error })
	}
})

module.exports = router