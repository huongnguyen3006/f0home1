const express = require('express')
const router = express.Router()

const lecture = require("../model/lecture.js")
 
//create a model Product ==> Products (database collection)
//Teacher => teachers , Course => courses
router.get('/lectures', function(req, res){
    lecture.find({}, function(err, lecture){
       res.send(lecture)
   })
})
 
router.post('/lectures', function(req, res){
    lecture.create(req.body, function(err, lecture){
       res.send(lecture)
   })
})
 
router.delete('/lectures/:id', function(req, res){
    lecture.deleteOne({_id: req.params.id}, function(err, result){
       res.send(result)
   })
})
 
router.put('/lectures', function(req, res){
    lecture.findOneAndUpdate({_id: req.body.id},
    {name: req.body.name, teacher: req.body.teacher, slides:  req.body.slides, date:  req.body.date}, 

    function(err, result){
       res.send(result)
   })
})
 
 
router.get('/lectures/search', async function(req, res){
//    Product.find({name: req.params.keyword}, function(err, result){
//        res.send(result)
//    })
    const keyword = req.query.keyword
    const pageSize = parseInt(req.query.pageSize)
    const pageNo =  parseInt(req.query.pageNo)

    //count number of documents:
    const number = await lecture.countDocuments({name: {$regex: '.*' + keyword + '.*'}});
    const skipNo =pageSize*(pageNo-1)

    // Product.find({name: {$regex: '.*' + keyword + '.*'}}, 
    // function(err, result){
    //     res.send(result)
    // })

    const result = await lecture.find({name: {$regex: '.*' + keyword + '.*'}})
    .skip(skipNo).limit(pageSize)
    res.send({Size: number, Items: result})

})
 

module.exports = router
