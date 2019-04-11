import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DoctorComponent } from './doctor/doctor.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'doctor-dashboard',
    component : DoctorComponent,

  }]
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
