const express = require('express')
const router = express.Router()

const Volunteer = require("../model/volunteer.js")
 
//create a model Product ==> Products (database collection)
//Teacher => teachers , Course => courses
router.get('/volunteers', function(req, res){
    Volunteer.find({}, function(err, volunteers){
       res.send(volunteers)
   })
})
 
router.post('/volunteers', function(req, res){
    Volunteer.create(req.body, function(err, volunteers){
       res.send(volunteers)
   })
})
 
router.delete('/volunteers/:id', function(req, res){
    Volunteer.deleteOne({_id: req.params.id}, function(err, result){
       res.send(result)
   })
})
 
router.put('/volunteers', function(req, res){
    Volunteer.findOneAndUpdate({_id: req.body.id},
    {name: req.body.name, age: parseInt(req.body.age), avatar: req.body.avatar, phone: req.body.phone, address: req.body.address }, 

    function(err, result){
       res.send(result)
   })
})
 
 
router.get('/volunteers/search', async function(req, res){
//    Product.find({name: req.params.keyword}, function(err, result){
//        res.send(result)
//    })
    const keyword = req.query.keyword
    const pageSize = parseInt(req.query.pageSize)
    const pageNo =  parseInt(req.query.pageNo)

    //count number of documents:
    const number = await Volunteer.countDocuments({name: {$regex: '.*' + keyword + '.*'}});
    const skipNo =pageSize*(pageNo-1)

    // Product.find({name: {$regex: '.*' + keyword + '.*'}}, 
    // function(err, result){
    //     res.send(result)
    // })

    const result = await Volunteer.find({name: {$regex: '.*' + keyword + '.*'}})
    .skip(skipNo).limit(pageSize)
    res.send({Size: number, Items: result})

})
 

module.exports = router
