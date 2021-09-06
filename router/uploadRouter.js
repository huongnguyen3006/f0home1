const multer = require('multer')
const express = require('express')
const router = express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })


  router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    console.log(file)
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
    
  })

  //Uploading multiple files
  router.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    console.log(req.files)
    const files = req.files
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
   
      res.send(files)
    
  })

  module.exports = router