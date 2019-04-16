import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToPatient() {

    this.router.navigate(['doctor/patient/' + '3']);

  }

}
