const express = require('express')
const router = express.Router()

const f0 = require("../model/f0.js")
 
router.get('/doctors', function(req, res){
    f0.find({}, function(err, f0){
       res.send(f0)
   })
})
 
router.post('/f0s', function(req, res){
    f0.create(req.body, function(err, f0){
       res.send(f0)
   })
})
 
router.delete('/f0s/:id', function(req, res){
    f0.deleteOne({_id: req.params.id}, function(err, result){
       res.send(result)
   })
})


router.put('/f0s', function(req, res){
    f0.findOneAndUpdate({_id: req.body.id},
    {name: req.body.name, age: parseInt(req.body.age)}, 

    function(err, result){
       res.send(result)
   })
})
 
 
router.get('/f0s/search', async function(req, res){

    const keyword = req.query.keyword
    const pageSize = parseInt(req.query.pageSize)
    const pageNo =  parseInt(req.query.pageNo)

    //count number of documents:
    const number = await f0.countDocuments({name: {$regex: '.*' + keyword + '.*'}});
    const skipNo =pageSize*(pageNo-1)

    const result = await f0.find({name: {$regex: '.*' + keyword + '.*'}})
    .skip(skipNo).limit(pageSize)
    res.send({Size: number, Items: result})

})

//this has to be put after the search
router.get('/f0s/:id', function(req, res){
    f0.findById({_id: req.params.id}, function(err, result){
       res.send(result)
   })
})
 
 

module.exports = router
