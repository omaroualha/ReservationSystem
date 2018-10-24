var mongoose=require('mongoose');
var reservationSchema = mongoose.Schema({
        user : {type : String, required : true, default : "omar"},
        dateDebut : {type : Date},
        dateFin : {type : Date},
        NomSalle : {type : String, required : true},
});

module.exports=mongoose.model("Reservation",reservationSchema);