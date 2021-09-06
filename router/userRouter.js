const express = require('express')
const router = express.Router()

const User = require("../model/user.js")
 
//create a model Product ==> Products (database collection)
//Teacher => teachers , Course => courses
router.get('/users', function(req, res){
   User.find({}, function(err, users){
       res.send(users)
   })
})
        
router.post('/users', function(req, res){
   User.create(req.body, function(err, user){
       res.send(user)
   })
})
 
router.delete('/users/:id', function(req, res){
   User.deleteOne({_id: req.params.id}, function(err, result){
       res.send(result)
   })
})
 
router.put('/users', function(req, res){
   User.findOneAndUpdate({_id: req.body.id},
    {name: req.body.name, price: req.body.price}, 

    function(err, result){
       res.send(result)
   })
})
 
 
router.get('/users/search', async function(req, res){
//    Product.find({name: req.params.keyword}, function(err, result){
//        res.send(result)
//    })
    const keyword = req.query.keyword
    const pageSize = parseInt(req.query.pageSize)
    const pageNo =  parseInt(req.query.pageNo)

    //count number of documents: "$options": "ix"
    const number = await User.countDocuments({name: {$regex: '.*' + keyword + '.*', "$options": "ix"}});
    const skipNo =pageSize*(pageNo-1)

    // Product.find({name: {$regex: '.*' + keyword + '.*'}}, 
    // function(err, result){
    //     res.send(result)
    // })

    const result = await User.find({name: {$regex: '.*' + keyword + '.*', "$options": "ix"}})
    .skip(skipNo).limit(pageSize)
    res.send({Size: number, Items: result})

})
 

module.exports = router
