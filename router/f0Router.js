const express = require('express')
const router = express.Router()

const f0 = require("../model/f0.js")
const doctor = require("../model/doctor.js")
 
router.get('/doctors', function(req, res){
    doctor.find({}, function(err, result){
       res.send(result)
   })
})

router.get('/f0s', function(req, res){
    f0.find({}, function(err, f0){
       res.send(f0)
   })
})

router.post('/f0s', async function(req, res){
    req.body.created_by = req.user._id

    let doc = await doctor.findOne({_id: req.body.treated_by})

    // req.body.treated_by_name = doc.name 
    req.body.treated_by = doc

    // console.log(req.body)

    f0.create(req.body,  function(err, results){
       res.send(results)
   })
})
 
// router.post('/f0s', function(req, res){
//     f0.create(req.body, function(err, f0){
//        res.send(f0)
//    })
// })
 
router.delete('/f0s/:id', function(req, res){
    f0.deleteOne({_id: req.params.id}, function(err, result){
       res.send(result)
   })
})


router.put('/f0s', function(req, res){
   
    f0.findOneAndUpdate({_id: req.body.id},
    {name: req.body.name, 
    age: req.body.age, 
    add: req.body.add, 
    tel: req.body.tel, 
    zalo: req.body.zalo, 
    dop: req.body.dop, 
    symptoms_st: req.body.symptoms_st, 
    don: req.body.don,
    treatment: req.body.treatment,
    treated_by: req.body.treated_by }, 

    function(err, result){
       res.send(result)
   })
})
 
 
router.get('/f0s/search', async function(req, res){

    

    const keyword = req.query.keyword
    const pageSize = parseInt(req.query.pageSize)
    const pageNo =  parseInt(req.query.pageNo)
    let roles = req.user.roles

  
    //count number of documents:
     //roe===admin
     if (roles==="admin"){
    const number = await f0.countDocuments({name: {$regex: '.*' + keyword + '.*'}});
    const skipNo =pageSize*(pageNo-1)
    const result = await f0.find({name: {$regex: '.*' + keyword + '.*'}})
    .skip(skipNo).limit(pageSize)
    res.send({Size: number, Items: result})
     }
   
    //req.user._id

       //role ===f0
    if (roles==="f0"){
    const numberf0 = await f0.countDocuments({created_by: req.user._id});
    const skipNof0 =pageSize*(pageNo-1)

    const resultf0 = await f0.find({created_by: req.user._id})
    .skip(skipNof0).limit(pageSize)
    res.send({Size: numberf0, Items: resultf0})

    }

    //roe===doctor
    if (roles==="doctor"){
         const u = `${req.user._id}`
        //  console.log(u)
        const numberdoctor = await f0.countDocuments({"treated_by.user_id": String(req.user._id)});
        const skipNodoctor =pageSize*(pageNo-1)
    
        const resultdoctor = await f0.find({"treated_by.user_id": String(req.user._id)})
        .skip(skipNodoctor).limit(pageSize)
        res.send({Size: numberdoctor, Items: resultdoctor})

        // const numberdoctor = await f0.countDocuments({});
        // const skipNodoctor =pageSize*(pageNo-1)
    
        // const resultdoctor = await f0.find({})
        // .skip(skipNodoctor).limit(pageSize)
        // res.send({Size: numberdoctor, Items: resultdoctor})
    
        }


})

//this has to be put after the search
router.get('/f0s/:id', function(req, res){
    f0.findById({_id: req.params.id}, function(err, result){
       res.send(result)
   })
})
 
 

module.exports = router
