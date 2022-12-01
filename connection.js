const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://hansen:web@webprogramming.fboproe.mongodb.net/FTI21')

const db = mongoose.connection;

//schema
const StudentSchema = mongoose.Schema({
  name: String,
  password: String,
  age: Number
})

//Model
const StudentModel = mongoose.model('Student', StudentSchema)

module.exports = {
  StudentModel
}