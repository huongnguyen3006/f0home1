const express = require('express')
const router = express.Router()

const Church= require("../model/church.js")
 
//create a model Product ==> Products (database collection)
//Teacher => teachers , Course => courses
router.get('/churchs', function(req, res){
    Church.find({}, function(err, churchs){
       res.send(churchs)
   })
})
        
router.post('/churchs', function(req, res){
    Church.create(req.body, function(err, church){
       res.send(church)
   })
})
 
router.delete('/churchs/:id', function(req, res){
    Church.deleteOne({_id: req.params.id}, function(err, result){
       res.send(result)
   })
})
 
router.put('/churchs', function(req, res){
    Church.findOneAndUpdate({_id: req.body.id},
    {name: req.body.name, price: req.body.price}, 

    function(err, result){
       res.send(result)
   })
})
 
 
router.get('/churchs/search', async function(req, res){
//    Product.find({name: req.params.keyword}, function(err, result){
//        res.send(result)
//    })
    const keyword = req.query.keyword
    const pageSize = parseInt(req.query.pageSize)
    const pageNo =  parseInt(req.query.pageNo)

    //count number of documents: "$options": "ix"
    const number = await Church.countDocuments({name: {$regex: '.*' + keyword + '.*', "$options": "ix"}});
    const skipNo =pageSize*(pageNo-1)

    // Product.find({name: {$regex: '.*' + keyword + '.*'}}, 
    // function(err, result){
    //     res.send(result)
    // })

    const result = await Church.find({name: {$regex: '.*' + keyword + '.*', "$options": "ix"}})
    .skip(skipNo).limit(pageSize)
    res.send({Size: number, Items: result})

})
 

module.exports = router
