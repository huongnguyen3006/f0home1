const express = require('express')
const router = express.Router()
const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendinblue = require('../config/sendinblue')



// router.get('/testmail', async function(req, res){
//   try {
//     await sendinblue.sendMailResetPassword("thanh.hispvietnam@gmail.com", "tatsfasg")
  
//     res.send("test mail")
//   }
//   catch (err) {
//     console.log(err);
//   }
    
//  }) 

 // importing user context
const User = require("../model/user");


router.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});
  

  router.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { first_name, last_name, email, password } = req.body;
  
      // Validate user input
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });


  router.get("/resetpwd", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const email = req.query.email
      const hash = req.query.hash

      // Validate user input
      if (!(email && hash)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && user.hash == hash) {  
        // user
        await User.findOneAndUpdate({email: email}, {status: 'resetpwd'})

        res.status(200).send(`Reset ok. Please click <a href="http://localhost:3000/?page=resetpwdform&hash=${hash}">here</a> to update new password`)
      }
      else{
        res.status(400).send("Reset failed");
      }

      
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });
  

  router.post("/getResetPasswordLink", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const  email  = req.body.email;
  
      // Validate user input
      if (!(email)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });

      if (user){
        let r = (Math.random() + 1).toString(36);
        const hash = await bcrypt.hash(r, 10);
    
        await User.findOneAndUpdate({email: email}, {hash: hash})

        await sendinblue.sendMailResetPassword(email, hash)

        res.status(200).send("Sent reset password successfully. Check your email");
      }
      
      else{
        res.status(400).send("Couldn't find the user");
      }

     

    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

  router.get("/verify", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const email = req.query.email
      const hash = req.query.hash

      // Validate user input
      if (!(email && hash)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && user.hash == hash) {  
        // user
        await User.findOneAndUpdate({email: email}, {status: 'active'})
        res.status(200).send("Verify successful");
      }

      res.status(400).send("Verify failed");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });
  
  router.post("/resetpwdaction", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { email, hash, newPassword } = req.body;
  
      // Validate user input
      if (!(email && hash && newPassword)) {
        res.status(400).send("All input is required");
      }
  
      user = await User.findOne({ email });
  
      if (!(hash === user.hash)){
        res.status(400).send("Wrong reset info");
      }

       //Encrypt user password
       newEncryptedPassword = await bcrypt.hash(newPassword, 10);
  
      // Create user in our database
      user = await User.findOneAndUpdate({email: email}, {
        password: newEncryptedPassword
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

  router.get("/users", async (req, res) => {
    res.status(201).json(await User.find({}));
  });
  
  router.post("/changepassword", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { email, oldPassword, newPassword } = req.body;
  
      // Validate user input
      if (!(email && newPassword && oldPassword)) {
        res.status(400).send("All input is required");
      }
  
      user = await User.findOne({ email });
  
      if (!(await bcrypt.compare(oldPassword, user.password))){
        res.status(400).send("Wrong username/password");
      }

       //Encrypt user password
       newEncryptedPassword = await bcrypt.hash(newPassword, 10);
  
      // Create user in our database
      user = await User.findOneAndUpdate({email: email}, {
        password: newEncryptedPassword
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

  router.get("/users", async (req, res) => {
    res.status(201).json(await User.find({}));
  });

//endpoint???


module.exports = router;