import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from 'firebase/app';
import {PatientService } from '../../../services/patient.service';
@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {
  firestore: any;
  patients: any = [];
  patient: any;
  ispatient:boolean=false;
  

  constructor(private router: Router, private data: PatientService ) {    this.firestore = firebase.firestore();
  }

  ngOnInit() {
    this.getPatients();
    this.patient=false;
    console.log(this.patient)
  }


  navigateToPatient(patient) {
    this.data.changePatient(patient);

    this.router.navigate(['doctor/patient/']);

  }
  async getPatients() {
    const query = this.firestore.collection('Patient').orderBy('id').limit(10);
    const snapshot = await query.get();
    snapshot.forEach( doc => {
      const currentPatient = doc.data();
      currentPatient.id = doc.id;
      this.patients.push(currentPatient);

    });
  }

}

