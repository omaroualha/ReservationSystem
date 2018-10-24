var express = require("express");
var fs = require("fs");
var router = express.Router();
var Reservation = require("../models/reservation");
var file = JSON.parse(fs.readFileSync("./reservation.json"));
var rooms = JSON.parse(fs.readFileSync("./rooms.json"));
var lst = [];



router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});


router.post("/SalleDisponible", (req, res) => {
  Reservation.find({}, function (err, results) {
    if (err) {
      res.send(err);
    }
    res.send(getRooms(results, req.body.dateDebut, req.body.dateFin, req.body.capacite, req.body.equipement));

  })
});


router.post("/reservationpush", (req, res, next) => {
  var reservation = new Reservation(req.body);
  reservation.save(function (err, res) {
    if (err) {
      res.send(err);
    }
    file.Reservations.push(reservation);
    fs.writeFileSync("./reservation.json", JSON.stringify(file));
    res.send(res);
  })

})




router.get("/Sallles", function (req, res) {
  res.send(rooms);
});



function getRooms(reserva, MyStartDate, MyEndDate, capacity, equipement) {
  lst.splice(0, lst.length);//initialisé la liste
  CapacityFilter(lst, capacity);
  if (equipement) {
    if (equipement == "Projecteur et TV") {
      EquipementFilter2(lst);
    }
    else {
      EquipementFilter(lst, equipement);

    }

  }

  reserva.forEach(j => {
    lst.forEach(i => {
     const verifDate = (
        new Date(MyStartDate) >= new Date(j.dateDebut)
        &&
        new Date(MyStartDate) <= new Date(j.dateFin))
        ||
        (new Date(j.dateDebut) >= new Date(MyStartDate)
          && new Date(j.dateDebut) <= new Date(MyEndDate)
        );

      if (
        (i.name == j.NomSalle)
        &&
        (verifDate == true)
      ) {
        index = lst.findIndex(x => x.name == i.name);
        lst.splice(index, 1);
      }
    });
  });
  return lst;
}


function CapacityFilter(lst, capacity) {
  rooms.rooms.forEach(i => {
    if (capacity <= i.capacity) {
      lst.push(i);

    }
  });
}

function EquipementFilter(lst, equi) {
  var i = 0;

  do {
    const element = lst[i];
    const EquipementsArray = element.equipements.map(a => a.name);

    if (!(EquipementsArray.includes(equi))) {
      lst.splice(i, 1);
    }


    else {
      i++;
    }

  }
  while (i < lst.length);

}

function EquipementFilter2(lst) {
  var i = 0;

  do {
    const element = lst[i];
    const EquipementsArray = element.equipements.map(a => a.name);

    if (EquipementsArray.length != 2) {
      lst.splice(i, 1);
    }


    else {
      i++;
    }

  }
  while (i < lst.length);

}



module.exports = router;
