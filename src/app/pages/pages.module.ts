import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DoctorComponent } from './doctor/doctor.component';


@NgModule({
  declarations: [PagesComponent, DoctorComponent ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],

})
export class PagesModule { }
