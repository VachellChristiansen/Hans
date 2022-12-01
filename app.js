const express = require('express')
const bcrypt = require('bcrypt')
const { StudentModel } = require('./connection')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  const data = await StudentModel.find({}).exec();
  console.log(data)
  res.render('index', { student: data || '' })
})

app.post('/register', async(req, res) => {
  const pw = await bcrypt.hash((req.body.password).toString(), 10)
  StudentModel.create({
    name: req.body.name,
    password: pw,
    age: req.body.age
  })
  res.redirect('/')
})


app.post('/login', async(req, res) => {
  const student = await StudentModel.findOne({ name: req.body.name }).exec();

  if (!student) {
    return res.redirect('/')
  } else {
    const isValid = await bcrypt.compare(req.body.password, student.password)
    if (!isValid) {
      return res.redirect('/')
    } else {
      return res.render('success', { student })
    }
  }
})

app.listen(5050, () => {
  console.log('http://localhost:5050')
})