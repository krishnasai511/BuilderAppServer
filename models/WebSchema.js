let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var webSchema = mongoose.Schema({
    title:{
        type:String
       },
    description:{
        type:String
    },
    bgColor:{
         type :String
        },
     bgImg:{
         type :String
        },
     bodyAboutTitle:{ 
         type :String
        },
    bodyAboutContent:{
         type :String
        }

});

module.exports = mongoose.model('PageData',webSchema);
