import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import {PatientService } from '../../../services/patient.service';
import * as firebase from 'firebase/app';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment';
import {Moment} from 'moment';

@Component({
  selector: 'app-single-patient',
  templateUrl: './single-patient.component.html',
  styleUrls: ['./single-patient.component.scss']
})
export class SinglePatientComponent implements OnInit {
  patient: any;
  pain: any;
  fatigue: any;
  nausea: any;
  dizziness: any;
  firestore: any;
  ispatient = true;
  panelOpenState = false;
  today = moment(new Date()).format('LLLL');

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
    }
  };


  public barChartLabels: Label[] = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8',
   '8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17',
  '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-0'];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: this.pain, label: 'Douleur' },
    { data: this.fatigue, label: 'Fatigue' },
    { data: this.nausea, label: 'Nausée' },
  ];
  public barChartColors: Color[] = [
    {
      borderColor: 'rgb(0, 174, 239)',
      backgroundColor: 'rgb(0, 174, 239,0.3)',
    },
    {
      borderColor: 'red',
      backgroundColor: 'rgb(255, 0, 0,0.3)',
    },
    {
      borderColor: 'green',
      backgroundColor: 'rgb(0, 255, 0,0.3)',
    },
  ];
  constructor(public router: Router, private data: PatientService) {
    this.firestore = firebase.firestore();
    moment.locale('fr');
   }

   ngOnInit() {
    this.today = moment(new Date()).format('LL');
    this.data.currentPatient.subscribe(patient => this.patient = patient);
    this.assignData();

  }
  public assignData() {
    this.pain = this.random();
    this.fatigue = this.random();
    this.dizziness = this.random();
    this.nausea = this.random();
    this.barChartData = [    { data: this.pain, label: 'Douleur' },
    { data: this.fatigue, label: 'Fatigue' },
    { data: this.nausea, label: 'Nausée' }];
    console.log(this.barChartData);

  }

  public random() {

    const valeurs = [];

    for (let i = 0; i <= 23; i++) {
        const rand = Math.floor(Math.random() * 10) + 0;
        valeurs[i] = rand;
    }
    return valeurs;

  }

  async getRTData(patient) {
    const query = this.firestore.collection('Patient').doc(patient.id).collection('Symptom').limit(1);
    const snapshot = await query.get();
    this.pain = snapshot.docs[0].data().pain;
    this.fatigue = snapshot.docs[0].data().fatigue;
    this.dizziness = snapshot.docs[0].data().dizziness;
    this.nausea = snapshot.docs[0].data().nausea;
    this.barChartData = [    { data: this.pain, label: 'Douleur' },
    { data: this.fatigue, label: 'Fatigue' },
    { data: this.nausea, label: 'Nausée' }];
    console.log(this.barChartData);
  }


}
