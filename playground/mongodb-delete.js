// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
	if(err) {
	   return console.log('Unable to connect to MongoDB server')
	}
	console.log('Connected to MongoDB server')
	const db = client.db('TodoApp')
	
    //deleteMany
    // db.collection('Users').deleteMany({name: 'Kirill'}).then((result) => {
    //     console.log(result)
    // })

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result)
    // })

    //findOneAndDelete
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5c0c44cbb62319022d9a72c3')}).then((result) => {
        console.log(result)
    })

	// client.close()
})
