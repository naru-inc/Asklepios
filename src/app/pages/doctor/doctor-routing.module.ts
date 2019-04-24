import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { SinglePatientComponent } from '../patients/single-patient/single-patient.component';

const routes: Routes = [{
  path: '',
  component: DoctorComponent,
  children: [{
    path : 'dashboard',
    component: DoctorDashboardComponent
  },
{
  path: 'patient',
  component: SinglePatientComponent
},
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule { }
