const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Boolean,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  content: 'HTML is Easy',
  important: true,
})

person.save().then(result => {
  console.log(result)
  console.log('note saved!')
  mongoose.connection.close()
})