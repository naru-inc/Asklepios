import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './doctor.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { SinglePatientComponent } from '../patients/single-patient/single-patient.component';

@NgModule({
  declarations: [DoctorComponent, DoctorDashboardComponent,
    SidebarComponent, SinglePatientComponent],
  imports: [
    CommonModule,
    FormsModule,
    DoctorRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class DoctorModule { }
