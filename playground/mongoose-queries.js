const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// let id = '5c0ed868d0bf953cbd00e41d11'

// if (!ObjectID.isValid(id)) {
// 	console.log('ID is not valid')
// }

// Todo
// 	.find({
// 	_id: id
// 	})
// 	.then((todos) => {
// 		console.log('Todos', todos)
// 	})

// Todo
// 	.findOne({
// 		_id: id
// 		})
// 		.then((todo) => {
// 			console.log('Todo', todo)
// 		})

// Todo
// 	.findById(id)
// 	.then((todo) => {
// 		if (!todo) {
// 			return console.log('ID not found')
// 		}
// 		console.log('Todo By Id', todo)
// 	})
// 	.catch((e) => console.log(e))

User
	.findById('5c0c616f7be4725990abb672')
	.then((user) => {
		if (!user) {
			return console.log('User not found')
		}
		console.log('User By ID', user)
	})
	.catch((e) => console.log(e))

