import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class PatientService {

    patient: any;

  private patientData = new BehaviorSubject({});
  currentPatient = this.patientData.asObservable();

  constructor() { }

  changePatient(patient: object) {
    this.patientData.next(patient);
  }

}
