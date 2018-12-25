const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')
const authenticate = require('./middleware/authenticate')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

// POST i.e. Create a new TODO

app.post('/todos', authenticate, (req, res) => {
	const todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	})

	todo.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		res.status(400).send(e)
	})
})

// GET all TODOs
app.get('/todos', authenticate, (req, res) => {
	Todo.find({
		_creator: req.user._id
	}).then((todos) => {
		res.send({ todos })
	}, (e) => {
		res.status(400).send(e)
	})
})

// GET /todos/[specific ID]
app.get('/todos/:id', authenticate, (req, res) => {
	let id = req.params.id

	// 1. Validated ID using isValid
	if (!ObjectID.isValid(id)) {
		// 2. If not valid send 404 and empty body
		return res.status(404).send()
	}
	// 3. If valid: findById
	Todo.findOne({
		_id: id,
		_creator: req.user._id
	})
		.then((todo) => {
			// 5. If no todo - send back 404 with empty body
			if (!todo) {
				return res.status(404).send()
			}
			// 6. If todo - send it back, setting the body of the response to object {todo}, allows for future flexibility in case we want to add other properties to our response such as custom status codes
			res.status(200).send({todo})
		})
		// 4. If error: 400 - and send empty body back, error message is intentionally not included not to accidentally provide any sensitive information
		.catch((e) => res.status(400).send())	
})

// DELETE a specific TODO by its ID
app.delete('/todos/:id', authenticate, (req, res) => {
	let id = req.params.id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}
	Todo.findOneAndRemove({
		_id: id,
		_creator: req.user._id
	})
		.then((todo) => {
			if(!todo) {
				return res.status(404).send()
			}
			res.status(200).send(todo)
		})
		.catch((e) => res.status(400).send())
})

// PATCH a specific TODO by its ID
app.patch('/todos/:id', authenticate, (req, res) => {
	let id = req.params.id
	let body = _.pick(req.body, ['text', 'completed'])

	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime()
	} else {
		body.completed = false
		body.completedAt = null
	}

	Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true})
	.then((todo) => {
		if (!todo) {
			return res.status(404).send()
		}

		res.send({ todo })
	}).catch((e) => {
		res.status(400).send()
	})
})

// POST new User

app.post('/users', (req, res) => {
	let body = _.pick(req.body, ['email', 'password'])
	const user = new User(body)

	user.save().then(() => {
		return user.generateAuthToken()
	}).then((token) => {
		res.header('x-auth', token).send(user)
	}).catch((e) => {
		res.status(400).send(e)
	})
})

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user)
})

app.post('/users/login', (req, res) => {
	let body = _.pick(req.body, ['email', 'password'])
	
	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user)
		})

	}).catch((e) => {
		res.status(400).send()
	})
})

app.delete('/users/me/token', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(() => {
		res.status(200).send()
	}).catch((e) => {
		res.status(400).send()
	})
})

app.listen(port, () => console.log(`Started up at port ${port}`))

module.exports = { app }