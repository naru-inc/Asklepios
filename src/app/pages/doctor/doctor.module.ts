import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './doctor.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DoctorComponent, DoctorDashboardComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class DoctorModule { }
