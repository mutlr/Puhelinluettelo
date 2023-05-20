const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://uusposti456:${password}@cluster0.lppbvdq.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})
if (process.argv.length === 3) {
  Person.find({}).then(result  => {
      console.log("Phonebook:")
      result.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close();
  });
}
/*person.save().then(result => {
  console.log(result)
  console.log('note saved!')
  mongoose.connection.close()
}) */