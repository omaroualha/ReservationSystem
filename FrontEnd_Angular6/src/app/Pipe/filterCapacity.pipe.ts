import { ReservationService } from './../Services/Reservation.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCapacity'
})
export class FilterCapacityPipe implements PipeTransform {
  constructor(private service:ReservationService ) {
  }
  

  transform(items: any[], sel?: any): any {

    this.service.getSalle().subscribe(resp =>{
      items=resp;
    })
  
    return sel ? items.filter(sal => sal.capacity >= sel) :items;
  }

}
