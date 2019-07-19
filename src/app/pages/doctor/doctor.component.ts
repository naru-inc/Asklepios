import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import * as firebase from 'firebase/app';
import {PatientService } from '../../services/patient.service';
import * as moment from 'moment';
import {Moment} from 'moment';

export interface Patient {
  id:string;
  name: string;
  sex: string;
  age: number,
  rdv:any[]
}
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})

export class DoctorComponent implements OnInit {
  ispatient:boolean=false;
  patients: Patient[] = [];
  patient: any;
  constructor(private router: Router, private data: PatientService) { 
    moment.locale('fr');
  }

  ngOnInit() {
  this.getPatients();
  }

  drop(event: CdkDragDrop<Patient[]>) {
    moveItemInArray(this.patients, event.previousIndex, event.currentIndex);
  }

  navigateToPatient(patient) {
    this.data.changePatient(patient);
console.log(patient)
    this.router.navigate(['doctor/patient/']);

  }
 randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
  async getPatients() {
    var rendezvous=[]
    var sex=["M","F"] 
    var obvs=[true,false]
    var rds=["Controle","Chimio","Urgence","Premier Rendez-vous"]
    var names=["Hang Lemoine",  
        "Ai Applin",  
        "Lelia Chestnut",  
        "Evelynn Thormahlen",  
        "Shin Campanella",  
        "Billy Schroder",  
        "Sid Raiford",  
        "Delbert Thrash",  
        "Joannie Thorp",  
        "Estrella Roundtree",  
        "Cassy Galante",  
        "Geralyn Marcus",  
        "Shannon Polin",  
        "Zulma Jagger",  
        "Particia Jines",  
        "Gavin Tetzlaff",  
        "Milan Prevatte",  
        "Eleonore Bertone",  
        "Charmaine Capasso",  
        "Bess Espitia"  ];
      

    for (var i = 0; i < names.length; i++) {  
      for (var j = 0; j < 10; j++) {
        var randomtype = Math.floor(Math.random()*rds.length);
      var random_boolean = Math.random() >= 0.5;
        rendezvous[j]={
          date:this.randomDate(new Date(), new Date(2020, 0, 1)),
          type:rds[randomtype],
          observations:random_boolean
         
         }

       }
        this.patients[i]={
            id: (i+1).toString(),
            name:names[i],
            age: Math.floor(Math.random() * 45) + 55,
            sex:sex[Math.floor(Math.random() * 2) + 0],
            rdv:rendezvous
        }
      }

  }

}
