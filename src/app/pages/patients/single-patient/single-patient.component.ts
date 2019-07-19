import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { PatientService } from '../../../services/patient.service';
import * as firebase from 'firebase/app';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment';
import { Moment } from 'moment';

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
  headache: any;
  depression: any;
  anxiety: any;
  droziwness: any;
  wellBeing: any;
  breathe: any;
  appetite: any;
  dizziness: any;
  firestore: any;

  stored: any
  ispatient: boolean = true;
  updates: Subscription;
  panelOpenState = false;
  filterPerToday = false;
  filterperweek = false;
  filterpermonth = false;
  filterPerCustomDate = false;

  displayedColumns = ['rendezvous', 'type', 'observations'];
  displayedColumnsSv = ['symptom', 'level', 'date'];
  dataSource = [];
  clinicalSigns = [];
  today = moment(new Date()).format('LLLL');
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}], yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          max: 10
        }
      }]
    },
    plugins: {
      datalabels: {
        display: function (context) {
          return context.dataset.data[context.dataIndex] >= 1
        }
      }
    }
  };


  public barChartLabels: Label[] = [];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: this.pain, label: 'Douleur' },
    { data: this.fatigue, label: 'Fatigue' },
    { data: this.nausea, label: 'Nausée' },
    { data: this.headache, label: 'Migraine' },
    { data: this.depression, label: 'Dépression' },
    { data: this.anxiety, label: 'Anxiété' },
    { data: this.droziwness, label: 'Somnolence' },
    { data: this.wellBeing, label: 'Bien-être' },
    { data: this.breathe, label: 'Souffle' },
    { data: this.appetite, label: 'Appétit' },
  ];
  public barChartColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: '#E81123',
    },
    {
      borderColor: 'white',
      backgroundColor: '#2D7D9A',
    },
    {
      borderColor: 'white',
      backgroundColor: '#498205',
    },
    {
      borderColor: 'white',
      backgroundColor: '#F7630C',
    },
    {
      borderColor: 'white',
      backgroundColor: '#212121',
    },
    {
      borderColor: 'white',
      backgroundColor: '#018574',
    },
    {
      borderColor: 'white',
      backgroundColor: '#FFB900',
    },
    {
      borderColor: 'white',
      backgroundColor: '#01579B',
    },
    {
      borderColor: 'white',
      backgroundColor: '#8BC34A',
    },
    {
      borderColor: 'white',
      backgroundColor: '#2196F3',
    },
  ];
  constructor(public router: Router, private data: PatientService) {
    this.firestore = firebase.firestore();
    moment.locale('fr');

  }

  ngOnInit() {
    const updateinterval = interval(300000);
    this.listenToUpdates(this.patient)
    this.today = moment(new Date()).format('LLLL');
    this.data.currentPatient.subscribe(patient => this.patient = patient);
    this.filterForToday()
    this.dataSource = this.patient.rdv
    this.listenToUpdates(this.patient)
  }
  public listenToUpdates(patient) {
    const query = this.firestore.collection('Patient').doc("Hammadi").collection('Symptom').orderBy("time").onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        console.log("there's a change", change.doc.data())
      });
    });;
  }
  public filterPerWeek() {
    let today = new Date()
    let oneWeekAgo = new Date(today.setDate(today.getDate() - 7));
    this.filterPerToday = false;
    this.filterperweek = true;
    this.filterpermonth = false;
    this.filterPerCustomDate = false;
    this.barChartLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    this.pain = [0, 0, 0, 0, 0, 0, 0];
    this.fatigue = [0, 0, 0, 0, 0, 0, 0];
    this.dizziness = [0, 0, 0, 0, 0, 0, 0];
    this.nausea = [0, 0, 0, 0, 0, 0, 0];
    this.headache = [0, 0, 0, 0, 0, 0, 0];
    this.depression = [0, 0, 0, 0, 0, 0, 0];
    this.anxiety = [0, 0, 0, 0, 0, 0, 0];
    this.droziwness = [0, 0, 0, 0, 0, 0, 0];
    this.wellBeing = [0, 0, 0, 0, 0, 0, 0];
    this.breathe = [0, 0, 0, 0, 0, 0, 0];
    this.appetite= [0, 0, 0, 0, 0, 0, 0];

    this.getFilteredData(oneWeekAgo, new Date(), this.patient)
  }
  public filterPerMonth() {
    let today = new Date()
    let oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));
    this.filterPerToday = false;
    this.filterperweek = false;
    this.filterpermonth = true;
    this.filterPerCustomDate = false;
    this.barChartLabels = ['Semaine 1 ', 'Semaine 2', 'Semaine 3', 'Semaine 4', 'Semaine 5'];
    this.pain = [0, 0, 0, 0, 0];
    this.fatigue = [0, 0, 0, 0, 0];
    this.dizziness = [0, 0, 0, 0, 0];
    this.nausea = [0, 0, 0, 0, 0];
    this.headache = [0, 0, 0, 0, 0];
    this.depression = [0, 0, 0, 0, 0];
    this.anxiety = [0, 0, 0, 0, 0];
    this.droziwness = [0, 0, 0, 0, 0];
    this.wellBeing = [0, 0, 0, 0, 0];
    this.breathe = [0, 0, 0, 0, 0];
    this.appetite = [0, 0, 0, 0, 0];
    console.log(oneMonthAgo)
    this.getFilteredData(oneMonthAgo, new Date(), this.patient)
  }
  public filterForToday() {
    this.filterPerToday = true;
    this.filterperweek = false;
    this.filterpermonth = false;
    this.filterPerCustomDate = false;
    this.barChartLabels = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8',
    '8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17',
    '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-0'];
  this.pain = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.fatigue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.dizziness = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.nausea = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.headache = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.depression = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.anxiety = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.droziwness = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.wellBeing = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.breathe = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.appetite = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.getFilteredData(new Date(), new Date(), this.patient)
  }
  async getFilteredData(start, end, patient) {

    let duestart = new Date(start.setHours(0, 0, 0, 0));
    let dueend = new Date(end.setHours(24, 0, 0, 0));
    let diffMonths = dueend.getMonth() - duestart.getMonth();
      var timeDiff = Math.abs(duestart.getTime() - dueend.getTime());
      let dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const query = this.firestore.collection('Patient').doc("Hammadi").collection('Symptom').where('time', '>=', duestart).where('time', '<=', dueend).orderBy("time");
    const snapshot = await query.get()
    for (let i = 0; i < snapshot.size; i++) {
      let submissionDate = new Date(snapshot.docs[i].data().time.seconds * 1000);
      if (this.filterPerToday) {

        for (let j = 0; j < 23; j++) {
          if (j == submissionDate.getHours()) {
            if (snapshot.docs[i].data().name == "tiredness") {
              this.fatigue[j] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "pain") {
              this.pain[j] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "headache") {
              this.headache[j] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "depression") {
              this.depression[j] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "anxiety") {
              this.anxiety[j] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "drawziness") {
              this.droziwness[j] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "well-being") {
              this.wellBeing[j] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "breathe") {
              this.breathe[j] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "appetite") {
              this.appetite[j] = snapshot.docs[i].data().level
            }
          }
        }
      } else if (this.filterperweek) {
        for (let d = 1; d < 8; d++) {
          if (d == submissionDate.getDate()) {
            if (snapshot.docs[i].data().name == "tiredness") {
              this.fatigue[d] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "pain") {
              this.pain[d] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "headache") {
              this.headache[d] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "depression") {
              this.depression[d] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "anxiety") {
              this.anxiety[d] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "drawziness") {
              this.droziwness[d] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "well-being") {
              this.wellBeing[d] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "breathe") {
              this.breathe[d] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "appetite") {
              this.appetite[d] = snapshot.docs[i].data().level
            }
          }
        }

      }
      else if (this.filterpermonth) {
        let start = duestart.getDate()
        let m = duestart.getMonth()
        let end = 7 - duestart.getDay() + start
        let lastDate = new Date(dueend.getFullYear(), dueend.getMonth(), 0)
        

        for (let w = 0; w <= 4; w++) {
          for (let d = start; d < end; d++) {

            if (d == submissionDate.getDate() && m == submissionDate.getMonth()) {
              if (snapshot.docs[i].data().name == "tiredness") {
                this.fatigue[d] = snapshot.docs[i].data().level
              } else if (snapshot.docs[i].data().name == "pain") {
                this.pain[d] = snapshot.docs[i].data().level
              } else if (snapshot.docs[i].data().name == "headache") {
                this.headache[d] = snapshot.docs[i].data().level
              } else if (snapshot.docs[i].data().name == "depression") {
                this.depression[d] = snapshot.docs[i].data().level
              } else if (snapshot.docs[i].data().name == "anxiety") {
                this.anxiety[d] = snapshot.docs[i].data().level
              } else if (snapshot.docs[i].data().name == "drawziness") {
                this.droziwness[d] = snapshot.docs[i].data().level
              } else if (snapshot.docs[i].data().name == "well-being") {
                this.wellBeing[d] = snapshot.docs[i].data().level
              } else if (snapshot.docs[i].data().name == "breathe") {
                this.breathe[d] = snapshot.docs[i].data().level
              } else if (snapshot.docs[i].data().name == "appetite") {
                this.appetite[d] = snapshot.docs[i].data().level
              }
            }
          }
          if (end < lastDate.getDate()) {
            start = end
            end = start + 7
          } else if (end == lastDate.getDate()) {
            m = m + 1
            start = 1
            end = 8
          }
        }
      }
      this.barChartData = [{ data: this.pain, label: 'Douleur' },
      { data: this.fatigue, label: 'Fatigue' },
      { data: this.nausea, label: 'Nausée' },
      { data: this.headache, label: 'Migraine' },
      { data: this.depression, label: 'Dépression' },
      { data: this.anxiety, label: 'Anxiété' },
      { data: this.droziwness, label: 'Somnolence' },
      { data: this.wellBeing, label: 'Bien-être' },
      { data: this.breathe, label: 'Souffle' },
      { data: this.appetite, label: 'Appétit' }]


    }


  }
  public DoCustom(form) {
    let start = new Date(form.value.start)
    let end = new Date(form.value.end)
    this.filterPerToday = false;
    this.filterperweek = false;
    this.filterpermonth = false;
    this.filterPerCustomDate = true;
    this.getFilteredData(start, end, this.patient)
    //form.reset();

  }
  ngOnDestroy() {

    this.updates && this.updates.unsubscribe();

  }



}
