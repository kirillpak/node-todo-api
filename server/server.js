const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

const {mongoose} = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')

const app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		res.status(400).send(e)
	})
})

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({ todos })
	}, (e) => {
		res.status(400).send(e)
	})
})

// GET /todos/[specific ID]
app.get('/todos/:id', (req, res) => {
	let id = req.params.id

	// 1. Validated ID using isValid
	if (!ObjectID.isValid(id)) {
		// 2. If not valid send 404 and empty body
		return res.status(404).send()
	}
	// 3. If valid: findById
	Todo.findById(id)
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

app.listen(3000, () => {
	console.log('Started on port 3000')
})

module.exports = { app }