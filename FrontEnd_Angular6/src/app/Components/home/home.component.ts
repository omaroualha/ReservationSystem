import { ReservationService } from './../../Services/Reservation.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  salles: any;
  ok: boolean;
  equipements = [];
  cap: string;
  equi: string;
  Reservation =
    {
      dateDebut: "",
      dateFin: "",
      NomSalle: ""
    }

  DateDiso = {
    dateDebut: "",
    dateFin: "",
    capacite: "",
    equipement: ""
  }
  searchText: string;

  constructor(private service: ReservationService) {

  }

  ngOnInit() {
    this.ok = false;
    this.equipements = [
      {
        "name": "TV"
      },
      {
        "name": "Retro Projecteur"
      },
      {
        "name": "Projecteur et TV"
      }

    ];
  }



  RechercheSalles(date) {
    this.ok = true;
    let x = date.split(" ");

    this.DateDiso.dateDebut = x[0] + ":00Z";
    this.DateDiso.dateFin = x[2] + ":00Z";
    if (this.cap === undefined) {
      this.DateDiso.capacite = "0";
    }
    else {
      this.DateDiso.capacite = this.cap;
    }

    if (this.equi === undefined) {
      this.DateDiso.equipement = "";
    }
    else {
      this.DateDiso.equipement = this.equi;
    }

    this.service.getSalleDisponible(this.DateDiso).subscribe(resp => {
      this.salles = resp;
      console.log(this.salles)
    })
  }

  DoReservation(date, NomSalle) {
    let spliteDate = date.split(" ");
    this.Reservation.dateDebut = spliteDate[0] + ":00Z";
    this.Reservation.dateFin = spliteDate[2] + ":00Z";
    this.Reservation.NomSalle = NomSalle;
    console.log(NomSalle);
  }

  ConfirmeReservation() {
    this.service.DoReservation(this.Reservation).subscribe(resp => {
    })
  }
}
