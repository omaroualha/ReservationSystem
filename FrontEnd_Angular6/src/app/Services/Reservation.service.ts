import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

constructor(private http: Http) { }

getSalle(){
  return this.http.get('http://localhost:3000/api/Sallles').map(resp=>resp.json());
}

DoReservation(res)
{
  return this.http.post('http://localhost:3000/api/reservationpush',res).map(resp=>resp.json());
}


getSalleDisponible(res)
{
  return this.http.post('http://localhost:3000/api/SalleDisponible', res).map(resp=>resp.json());
}

}