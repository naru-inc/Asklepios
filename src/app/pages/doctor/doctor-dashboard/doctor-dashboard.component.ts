import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {
  firestore: any;
  patients: any = [];

  constructor(private router: Router) {    this.firestore = firebase.firestore();
  }

  ngOnInit() {
    this.getPatients();
  }


  navigateToPatient(id) {

    this.router.navigate(['doctor/patient/' + id]);

  }
  async getPatients() {
    const query = this.firestore.collection('Patient').orderBy('id').limit(10);
    const snapshot = await query.get();
    snapshot.forEach( doc => {
      this.patients.unshift(doc.data());

    });
  }

}

