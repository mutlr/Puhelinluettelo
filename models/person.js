const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI;

mongoose.connect(url).then(result => {
    console.log("Connected");
}).catch(error => {
    console.log("Error!", error);
})

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personSchema)