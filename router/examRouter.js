const express = require('express')
const router = express.Router()

const exam = require("../model/exam.js")
 
//create a model Product ==> Products (database collection)
//Teacher => teachers , Course => courses
router.get('/exams', function(req, res){
    exam.find({}, function(err, exam){
       res.send(exam)
   })
})

// get all exams by F0
router.get('/exams/f0/:f0', function(req, res){
    exam.find({f0: req.params.f0}, function(err, exam){
       res.send(exam)
   })
})
 
 
router.post('/exams', function(req, res){
    exam.create(req.body, function(err, exam){
       res.send(exam)
   })
})
 
router.delete('/exams/:id', function(req, res){
    exam.deleteOne({_id: req.params.id}, function(err, result){
       res.send(result)
   })
})
 
router.put('/exams', function(req, res){
    exam.findOneAndUpdate({_id: req.body.id},
    {name: req.body.name, age: parseInt(req.body.age)}, 

    function(err, result){
       res.send(result)
   })
})
 
 
router.get('/exams/search', async function(req, res){
//    Product.find({name: req.params.keyword}, function(err, result){
//        res.send(result)
//    })
    const keyword = req.query.keyword
    const pageSize = parseInt(req.query.pageSize)
    const pageNo =  parseInt(req.query.pageNo)

    let number = 0

    //count number of documents:
    if (keyword.trim() === ""){
        number = await exam.countDocuments({});
    }
    else{
        number = await exam.countDocuments({name: {$regex: '.*' + keyword + '.*'}});
    }
   
    const skipNo =pageSize*(pageNo-1)

    // Product.find({name: {$regex: '.*' + keyword + '.*'}}, 
    // function(err, result){
    //     res.send(result)
    // })

    if (keyword.trim() === ""){
        const result = await exam.find({})
        .skip(skipNo).limit(pageSize)
        res.send({Size: number, Items: result})
    }
    else{
        const result = await exam.find({name: {$regex: '.*' + keyword + '.*'}})
        .skip(skipNo).limit(pageSize)
        res.send({Size: number, Items: result})
    }

  

})
 

module.exports = router
