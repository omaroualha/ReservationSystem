import { FilterCapacityPipe } from './Pipe/filterCapacity.pipe';
import { HomeComponent } from './Components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReservationService } from './Services/Reservation.service';
import { APP_BASE_HREF } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterCapacityPipe  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    
    RouterModule.forRoot([
      {path:'',component:HomeComponent},
    ])
  ],
  providers: [
    ReservationService,
    {provide:APP_BASE_HREF, useValue : "/home"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
