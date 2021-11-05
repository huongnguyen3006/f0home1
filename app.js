require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../f0home1/client/build')));

const auth = require("./middleware/auth");

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});



//routers
const loginRouter = require("./router/userLoginRouter.js")
app.use('/', loginRouter)


// const f0homepage = require("./router/f0homepage.js")
// app.use('/', auth, f0homepage)

// const doctorhomepage = require("./router/doctorhomepage.js")
// app.use('/', auth, doctorhomepage)

const products = require("./router/productRouter.js")
app.use('/', auth, products)

const f0s = require("./router/f0Router.js")
app.use('/',auth, f0s)


const exams = require("./router/examRouter.js")
app.use('/', exams)

const users = require("./router/userRouter.js")
app.use('/', users)


const doctors = require("./router/doctorRouter.js")
app.use('/', auth, doctors)

const volunteers = require("./router/volunteerRouter.js")
app.use('/', volunteers)

const churchs = require("./router/churchRouter.js")
app.use('/', auth, churchs)

const lectures = require("./router/lectureRouter.js")
app.use('/', auth,lectures)

const uploads = require("./router/uploadRouter.js")
app.use('/', auth,uploads)

//for everyone to view files uploaded
app.use('/uploads', express.static('uploads'))




// All other GET requests not handled before will return our React app
app.get('/index.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../f0home1/client/build', 'index.html'));
});

module.exports = app;