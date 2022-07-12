/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.leng < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.njye2ip.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
  }
)

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  // add a new entry
  mongoose
    .connect(url)
    .then(result => {
      console.log('connected')

      const person = new Person({
        name: `${process.argv[3]}`,
        number: `${process.argv[4]}`
      })

      return person.save()
    })
    .then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))

} else if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then(result => {
      console.log('phonebook:')
      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
    })
    .catch(err => console.log(err))
}
