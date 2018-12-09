// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

var obj = new ObjectID()
console.log(obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
       return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')
    
    // Inserts a new doc into Todos collection with {text, completed} properties
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert todo', err)
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    // Inserts a new doc into Users collection with {name, age, location} properties
    // db.collection('Users').insertOne({
    //     name: 'Kirill',
    //     age: 33,
    //     location: 'Toronto'
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to add user', err)
    //     }

    //     console.log(result.ops[0]._id.getTimestamp())
    // })

    client.close()
})
