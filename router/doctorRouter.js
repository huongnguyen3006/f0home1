const express = require('express')
const router = express.Router()

const doctor = require("../model/doctor.js")
 
//create a model Product ==> Products (database collection)
//Teacher => teachers , Course => courses
router.get('/doctors', function(req, res){
    doctor.find({}, function(err, doctor){
       res.send(doctor)
   })
})
 
router.post('/doctors', function(req, res){
    doctor.create(req.body, function(err, doctor){
       res.send(doctor)
   })
})
 
router.delete('/doctors/:id', function(req, res){
    doctor.deleteOne({_id: req.params.id}, function(err, result){
       res.send(result)
   })
})
 
router.put('/doctors', function(req, res){
    doctor.findOneAndUpdate({_id: req.body.id},
    {name: req.body.name, age: parseInt(req.body.age), avatar: req.body.avatar, phone: req.body.phone, address: req.body.address }, 

    function(err, result){
       res.send(result)
   })
})
 
 
router.get('/doctors/search', async function(req, res){
//    Product.find({name: req.params.keyword}, function(err, result){
//        res.send(result)
//    })
    const keyword = req.query.keyword
    const pageSize = parseInt(req.query.pageSize)
    const pageNo =  parseInt(req.query.pageNo)

    //count number of documents:
    const number = await doctor.countDocuments({name: {$regex: '.*' + keyword + '.*'}});
    const skipNo =pageSize*(pageNo-1)

    // Product.find({name: {$regex: '.*' + keyword + '.*'}}, 
    // function(err, result){
    //     res.send(result)
    // })

    const result = await doctor.find({name: {$regex: '.*' + keyword + '.*'}})
    .skip(skipNo).limit(pageSize)
    res.send({Size: number, Items: result})

})
 

module.exports = router
