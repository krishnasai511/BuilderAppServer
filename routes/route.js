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
    
        var newData = new WebSchema(req.body);


         newData.save(function(err) {
             if(err) throw err;

             else console.log('Save Successfully');
             res.status(200).send({'status':1, 'msg':'Success'});

         })

     });

     router.post('/forgotPassword',(req,res,next)=>{
     User.findOne({email},function(){
       
     })
     })

    

//   router.put('/update',function(req,res){
//     var id=req.body.id;
//     WebSchema.findOne({_id: id},function(err,foundObject){

//   if(err){
//     console.log(err);
//     res.status(500).send();
//   }
//   else{
//     if(!foundObject){
//       res.status(404).send();
//     }
//     else{
//       foundObject.body=req.body;
//     }

//     foundObject.save(function(err,updatedObject){
//       if(err){
//         console.log(err);
//         res.status(500).send();
//       }
//       else{
//         res.send(updatedObject);
//       }
//     });
//   }
// });
//  });


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

    router.get('/checkid', (req,res) => {
       console.log(req.query.id)
       WebSchema.find({userhref: req.query.id}).then((data)=>{
         console.log(data);
         return res.status(200).send({data:data})
       })
    })
    
    // router.get('/special', verifyToken, (req, res) => {
      
    // })
    
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

            res.status(200).send({user:user,token:token})
          }
        }
      })
    })  
      
  

module.exports = router;
