const express = require('express')
const router = express.Router()

const Product = require("../model/product.js")
 
//create a model Product ==> Products (database collection)
//Teacher => teachers , Course => courses
router.get('/products', function(req, res){
   Product.find({}, function(err, products){
       res.send(products)
   })
})
 
router.post('/products', function(req, res){
   Product.create(req.body, function(err, product){
       res.send(product)
   })
})
 
router.delete('/products/:id', function(req, res){
   Product.deleteOne({_id: req.params.id}, function(err, result){
       res.send(result)
   })
})
 
router.put('/products', function(req, res){
   Product.findOneAndUpdate({_id: req.body.id},
    {name: req.body.name, price: req.body.price}, 

    function(err, result){
       res.send(result)
   })
})
 
 
router.get('/products/search', async function(req, res){
//    Product.find({name: req.params.keyword}, function(err, result){
//        res.send(result)
//    })
    const keyword = req.query.keyword
    const pageSize = parseInt(req.query.pageSize)
    const pageNo =  parseInt(req.query.pageNo)

    //count number of documents: "$options": "ix"
    const number = await Product.countDocuments({name: {$regex: '.*' + keyword + '.*', "$options": "ix"}});
    const skipNo =pageSize*(pageNo-1)

    // Product.find({name: {$regex: '.*' + keyword + '.*'}}, 
    // function(err, result){
    //     res.send(result)
    // })

    const result = await Product.find({name: {$regex: '.*' + keyword + '.*', "$options": "ix"}})
    .skip(skipNo).limit(pageSize)
    res.send({Size: number, Items: result})

})
 

module.exports = router
