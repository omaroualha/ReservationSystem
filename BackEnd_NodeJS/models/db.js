//create data base
 var mongoose=require('mongoose');
 mongoose.connect('mongodb://127.0.0.1/StationFBD', { useNewUrlParser: true },function (err,result) {
     if(err){
         return console.log("error");
     }
     return console.log("succesfully connected to mongodb");
 });
 module.exports=mongoose;
 