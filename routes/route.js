let express = require('express');
let router = express.Router();
let bodyparser = require('body-parser');
let cors = require('cors');
const User=require('../models/user');
const jwt = require('jsonwebtoken')
let WebSchema = require('../models/WebSchema');
router.use(bodyparser());
router.use(cors());


console.log("Running");

     router.post('/saveRecord', (req,res,next)=>{
         console.log(req.body);
        
         var newData = new WebSchema({title:req.body.title,
            description:req.body.description,
            bgColor:req.body.bgColor,
            bgImg:req.body.bgImg,
            bodyAboutTitle:req.body.bodyAboutTitle,
           bodyAboutContent:req.body.bodyAboutContent
        });
         newData.save(function(err) {
             if(err) throw err;

             else console.log('Save Successfully');
             res.status(200).send({'status':1, 'msg':'Success'});
         })

     });

     function verifyToken(req, res, next) {
        if(!req.headers.authorization) {
          return res.status(401).send('Unauthorized request')
        }
        let token = req.headers.authorization.split(' ')[1]
        if(token === 'null') {
          return res.status(401).send('Unauthorized request')    
        }
        let payload = jwt.verify(token, 'secretKey')
        if(!payload) {
          return res.status(401).send('Unauthorized request')    
        }
        req.userId = payload.subject
        next()
      }

    router.get('/events', (req,res) => {

    })
    
    router.get('/special', verifyToken, (req, res) => {
      
    })
    
    router.post('/signup', (req, res) => {
      let userData = req.body
      let user = new User(userData)
      user.save((err, registeredUser) => {
        if (err) {
          console.log(err)      
        } else {
          let payload = {subject: registeredUser._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      })
    })
    
    router.post('/login', (req, res) => {
      let userData = req.body
      User.findOne({email: userData.email}, (err, user) => {
        if (err) {
          console.log(err)    
        } else {
          if (!user) {
            res.status(401).send('Invalid Email')
          } else 
          if ( user.password !== userData.password) {
            res.status(401).send('Invalid Password')
          } else {
            let payload = {subject: user._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
          }
        }
      })
    })  
      
  

module.exports = router;
