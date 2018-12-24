const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

const data = {
	id: 10
}

const token = jwt.sign(data, '123abc')
console.log(token)

const decoded = jwt.verify(token, '123abc')
console.log('decoded', decoded)

// <---   EXAMPLE OF AUTHENTICATION TOKEN WITH HASHING LIBRARY ONLY (crypto-js) --->

// const message = 'I am user number 3'
// const hash = SHA256(message).toString()
// console.log(`Message ${message}`)
// console.log(`Hash: ${hash}`)

// 1. User data provided by user4 on the client/browser side
// const data = {
// 	id: 4
// }

// // 2. Original hashing of user4 data on the server side
// const token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // 4 (if at all): Someone in the middle (malevolent actor) on the client/browser side
// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(token.data)).toString()

// // 3. Authentication of the user on the server side
// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
// if (resultHash === token.hash) {
// 	console.log('Data was not changed')
// } else {
// 	console.log('Data was changed. Do not trust!')
// }
