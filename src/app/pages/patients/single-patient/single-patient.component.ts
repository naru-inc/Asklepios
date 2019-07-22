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
export interface Section {
  name: string;
  updated: Date;
}

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
  average: any;
  middle: any;
  dayOfPain: any;
  weekOfPain: any;
  monthOfPain: any;
  monthsOfPain: any;
  max: any;
  min: any;
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
  public ScoresOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 10
        }
      }]
    }
  };
  public PainOptions: ChartOptions = {
    responsive: true,
    scales: {
      display: false,
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
  public ScoresLabels: Label[] = ['Douleur', 'Fatigue', 'Nausée', 'Migraine', 'Dépression', 'Anxiété', 'Somnolence', 'Bien-être', 'Souffle', 'Appétit'];
  public PainLabels: Label[] = ['Tête', 'Poitrine', 'Bras', 'Abdomen', 'Jambes'];


  public barChartType: ChartType = 'bar';
  public ScoresChart: ChartType = 'line';
  public PainChart: ChartType = 'radar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public ScoresData: ChartDataSets[] = [
    { data: this.average, label: 'Moyenne' },
    { data: this.middle, label: 'Mediane' },
    { data: this.max, label: 'Maximum' },
    { data: this.min, label: 'Minimum' }
  ];
  public PainData: ChartDataSets[] = [
    { data: this.dayOfPain, label: 'Cette Journée' },
    { data: this.weekOfPain, label: 'Cette Semaine' },
    { data: this.monthOfPain, label: 'Ce Mois' },
    { data: this.monthsOfPain, label: 'Ces Derniers Mois' }
  ];
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
      backgroundColor: '#dc3f4d',
    },
    {
      borderColor: 'white',
      backgroundColor: '#F28D78',
    },
    {
      borderColor: 'white',
      backgroundColor: '#C4DE00',
    },
    {
      borderColor: 'white',
      backgroundColor: '#FF5722',
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
      backgroundColor: '#6D92C7',
    },
    {
      borderColor: 'white',
      backgroundColor: '#7E57C2',
    },
    {
      borderColor: 'white',
      backgroundColor: '#2196F3',
    },
  ];
  public ScoresColors: Color[] = [
    {
      borderColor: '#01579B',
      backgroundColor: 'transparent',

    },
    {
      borderColor: '#1A237E',
      backgroundColor: 'transparent',
    },
    {
      borderColor: '#d50000',
      backgroundColor: 'transparent',
    },
    {
      borderColor: '#00C853',
      backgroundColor: 'transparent',
    }
  ];
  public PainColors: Color[] = [
    {
      borderColor: '#dc3f4d',
      backgroundColor: '#ef9a9a',
    },
    {
      borderColor: '#FF5722',
      backgroundColor: '#FFAB91',
    },
    {
      borderColor: '#FF9800',
      backgroundColor: '#FFCC80',
    },
    {
      borderColor: '#FFC107',
      backgroundColor: '#FFE082',
    }
  ];
  folders: Section[] = [
    {
      name: 'Bilans',
      updated: new Date('7/1/19'),
    },
    {
      name: 'Analyses Laboratoires',
      updated: new Date('3/20/19'),
    },
    {
      name: 'Images & Radiologie',
      updated: new Date('6/28/19'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Notes sur la réaction du patient au traitement',
      updated: new Date('5/20/19'),
    },
    {
      name: 'Observation Aprés Rendez-Vous',
      updated: new Date('4/18/19'),
    }
  ];
  constructor(public router: Router, private data: PatientService) {
    this.firestore = firebase.firestore();
    moment.locale('fr');

  }

  ngOnInit() {
    this.filterForToday()
    this.filterPerToday = true;
    this.filterperweek = false;
    this.filterpermonth = false;
    this.filterPerCustomDate = false;
    
    this.dayOfPain = [0, 0, 0, 0, 0, 0]
    this.weekOfPain = [0, 0, 0, 0, 0, 0]
    this.monthOfPain = [0, 0, 0, 0, 0, 0]
    this.monthsOfPain = [0, 0, 0, 0, 0, 0]
    this.today = moment(new Date()).format('LLLL');
    this.data.currentPatient.subscribe(patient => this.patient = patient);
  
    this.dataSource = this.patient.rdv
    this.listenToUpdates(this.patient)
  }

  public listenToUpdates(patient) {
    let today = new Date()
    let yestarday = new Date(today.setDate(today.getDate() - 1));
    const query = this.firestore.collection('Patient').doc("Hammadi").collection('Symptom').orderBy("time").onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach((change) => {
        let submissionDate = new Date( change.doc.data().time.seconds * 1000);
        if (this.filterPerToday && submissionDate.getDate() == yestarday.getDate()) {
          for (let j = 0; j < 23; j++) {
            if (j == submissionDate.getHours()) {
              console.log(change.doc.data())
              if ( change.doc.data().name == "tiredness") {
                this.fatigue[j] = change.doc.data().level
              } else if ( change.doc.data().name == "pain") {
                this.pain[j] = change.doc.data().level
                if ( change.doc.data().area == "head") {
                  this.dayOfPain[0] = change.doc.data().level
                }
                else if ( change.doc.data().area == "chest") {
                  this.dayOfPain[1] = change.doc.data().level
                }
                else if ( change.doc.data().area == "palv") {
                  this.dayOfPain[2] = change.doc.data().level
                }
                else if ( change.doc.data().area == "stomach") {
                  this.dayOfPain[3] = change.doc.data().level
                }
                else {
                  this.dayOfPain[4] = change.doc.data().level
                }
              } else if ( change.doc.data().name == "headache") {
                this.headache[j] = change.doc.data().level
              } else if ( change.doc.data().name == "depression") {
                this.depression[j] = change.doc.data().level
              } else if ( change.doc.data().name == "anxiety") {
                this.anxiety[j] = change.doc.data().level
              } else if ( change.doc.data().name == "drawziness") {
                this.droziwness[j] = change.doc.data().level
              } else if ( change.doc.data().name == "well-being") {
                this.wellBeing[j] = change.doc.data().level
              } else if ( change.doc.data().name == "breathe") {
                this.breathe[j] = change.doc.data().level
              } else if ( change.doc.data().name == "appetite") {
                this.appetite[j] = change.doc.data().level
              }
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
        
      });
    });;
  }
  public filterForWeek() {
    let today = new Date()
    let end = new Date()
    this.barChartLabels = []
    let oneWeekAgo = new Date(today.setDate(today.getDate() - 7));
    this.filterPerToday = false;
    this.filterperweek = true;
    this.filterpermonth = false;
    this.filterPerCustomDate = false;
    var timeDiff = Math.abs(end.getTime() - oneWeekAgo.getTime());
    let dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    for (let j = oneWeekAgo.getDate(); j <= end.getDate(); j++) {
      this.barChartLabels.push(j.toString() + "/" + (oneWeekAgo.getMonth() + 1).toString())
    }
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
    this.appetite = [0, 0, 0, 0, 0, 0, 0];

    this.getFilteredData(oneWeekAgo, new Date(), this.patient)
  }
  public filterForMonth() {
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
    this.getFilteredData(oneMonthAgo, new Date(), this.patient)
  }
  public filterForToday() {
    this.filterPerToday = true;
    this.filterperweek = false;
    this.filterpermonth = false;
    this.filterPerCustomDate = false;
    let today = new Date()
    let yestarday = new Date(today.setDate(today.getDate() - 1));

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
    this.getFilteredData(yestarday, yestarday, this.patient)
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
              this.fatigue[submissionDate.getHours()] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "pain") {
              this.pain[submissionDate.getHours()] = snapshot.docs[i].data().level
              if (snapshot.docs[i].data().area == "head") {
                this.dayOfPain[0] = snapshot.docs[i].data().level
              }
              else if (snapshot.docs[i].data().area == "chest") {
                this.dayOfPain[1] = snapshot.docs[i].data().level
              }
              else if (snapshot.docs[i].data().area == "palv") {
                this.dayOfPain[2] = snapshot.docs[i].data().level
              }
              else if (snapshot.docs[i].data().area == "stomach") {
                this.dayOfPain[3] = snapshot.docs[i].data().level
              }
              else {
                this.dayOfPain[4] = snapshot.docs[i].data().level
              }
            } else if (snapshot.docs[i].data().name == "headache") {
              this.headache[submissionDate.getHours()] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "depression") {
              this.depression[submissionDate.getHours()] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "anxiety") {
              this.anxiety[submissionDate.getHours()] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "drawziness") {
              this.droziwness[submissionDate.getHours()] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "well-being") {
              this.wellBeing[submissionDate.getHours()] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "breathe") {
              this.breathe[submissionDate.getHours()] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "appetite") {
              this.appetite[submissionDate.getHours()] = snapshot.docs[i].data().level
            }
          }
        }
      } 
      if (this.filterperweek) {
        for (let d = duestart.getDate(); d < dueend.getDate(); d++) {
          if (d == submissionDate.getDate()) {
            console.log("we are working here",d, "and the date of submission is",submissionDate)
            if (snapshot.docs[i].data().name == "tiredness") {
              this.fatigue[submissionDate.getDay()] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "pain") {
              this.pain[submissionDate.getDay()] = snapshot.docs[i].data().level
              if (snapshot.docs[i].data().area == "head") {
                this.weekOfPain[0] = snapshot.docs[i].data().level
              }
              else if (snapshot.docs[i].data().area == "chest") {
                this.weekOfPain[1] = snapshot.docs[i].data().level
              }
              else if (snapshot.docs[i].data().area == "palv") {
                this.weekOfPain[2] = snapshot.docs[i].data().level
              }
              else if (snapshot.docs[i].data().area == "stomach") {
                this.weekOfPain[3] = snapshot.docs[i].data().level
              }
              else {
                this.weekOfPain[4] = snapshot.docs[i].data().level
              }
            } else if (snapshot.docs[i].data().name == "headache") {
              this.headache[submissionDate.getDay()] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "depression") {
              this.depression[submissionDate.getDay()] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "anxiety") {
              this.anxiety[submissionDate.getDay()] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "drawziness") {
              this.droziwness[submissionDate.getDay()] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "well-being") {
              this.wellBeing[submissionDate.getDay()] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "breathe") {
              this.breathe[submissionDate.getDay()] = snapshot.docs[i].data().level
            } else if (snapshot.docs[i].data().name == "appetite") {
              this.appetite[submissionDate.getDay()] = snapshot.docs[i].data().level
            }
          }
        }

      }
       if (this.filterpermonth) {
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
                if (snapshot.docs[i].data().area == "head") {
                  this.monthOfPain[0] = snapshot.docs[i].data().level
                }
                else if (snapshot.docs[i].data().area == "chest") {
                  this.monthOfPain[1] = snapshot.docs[i].data().level
                }
                else if (snapshot.docs[i].data().area == "palv") {
                  this.monthOfPain[2] = snapshot.docs[i].data().level
                }
                else if (snapshot.docs[i].data().area == "stomach") {
                  this.monthOfPain[3] = snapshot.docs[i].data().level
                }
                else {
                  this.monthOfPain[0] = snapshot.docs[i].data().level
                }
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
      let minpain = Math.min.apply(null, this.pain), maxpain = Math.max.apply(null, this.pain), midpain = this.calculateMedian(this.pain), avgpain = this.calculateAvg(this.pain),
        minfatigue = Math.min.apply(null, this.fatigue), maxfatigue = Math.max.apply(null, this.fatigue), midfatigue = this.calculateMedian(this.fatigue), avgfatigue = this.calculateAvg(this.fatigue),
        minnausea = Math.min.apply(null, this.nausea), maxnausea = Math.max.apply(null, this.nausea), midnausea = this.calculateMedian(this.nausea), avgnausea = this.calculateAvg(this.nausea),
        minheadache = Math.min.apply(null, this.headache), maxheadache = Math.max.apply(null, this.headache), midheadache = this.calculateMedian(this.headache), avgheadache = this.calculateAvg(this.headache),
        mindepression = Math.min.apply(null, this.depression), maxdepression = Math.max.apply(null, this.depression), middepression = this.calculateMedian(this.depression), avgdepression = this.calculateAvg(this.depression),
        minanxiety = Math.min.apply(null, this.anxiety), maxanxiety = Math.max.apply(null, this.anxiety), midanxiety = this.calculateMedian(this.anxiety), avganxiety = this.calculateAvg(this.anxiety),
        mindroziwness = Math.min.apply(null, this.droziwness), maxdroziwness = Math.max.apply(null, this.droziwness), middroziwness = this.calculateMedian(this.droziwness), avgdroziwness = this.calculateAvg(this.droziwness),
        minwellBeing = Math.min.apply(null, this.wellBeing), maxwellBeing = Math.max.apply(null, this.wellBeing), midwellBeing = this.calculateMedian(this.wellBeing), avgwellBeing = this.calculateAvg(this.wellBeing),
        minbreathe = Math.min.apply(null, this.breathe), maxbreathe = Math.max.apply(null, this.breathe), midbreathe = this.calculateMedian(this.breathe), avgbreathe = this.calculateAvg(this.breathe),
        minappetite = Math.min.apply(null, this.appetite), maxappetite = Math.max.apply(null, this.appetite), midappetite = this.calculateMedian(this.appetite), avgappetite = this.calculateAvg(this.appetite);
      this.min = this.randomMin()
      this.max = this.randomMax()
      this.average = this.randomAvg()
      this.middle = this.randomMid()
      this.ScoresData = [
        { data: this.average, label: 'Moyenne' },
        { data: this.middle, label: 'Mediane' },
        { data: this.max, label: 'Maximum' },
        { data: this.min, label: 'Minimum' }
      ]

      this.PainData = [{ data: this.dayOfPain, label: 'Cette Journée' },
      { data: this.weekOfPain, label: 'Cette Semaine' },
      { data: this.monthOfPain, label: 'Ce Mois' },
      { data: this.monthsOfPain, label: 'Ces Derniers Mois' }
      ]
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
  public calculateMedian(array) {
    array.sort((a, b) => a - b);
    let lowMiddle = Math.floor((array.length - 1) / 2);
    let highMiddle = Math.ceil((array.length - 1) / 2);
    return (array[lowMiddle] + array[highMiddle]) / 2;
  }
  public calculateAvg(array) {
    let sum = array.reduce((previous, current) => current += previous);
    return sum / array.length;
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
  }
  public randomMin() {
    const valeurs = [];

    for (let i = 0; i <= 9; i++) {
      const rand = Math.floor(Math.random() * 4) + 0;
      valeurs[i] = rand;
    }

    return valeurs;
  }
  public randomMax() {
    const valeurs = [];

    for (let i = 0; i <= 9; i++) {
      const rand = Math.floor(Math.random() * 6) + 4;
      valeurs[i] = rand;
    }

    return valeurs;
  }
  public randomMid() {
    const valeurs = [];

    for (let i = 0; i <= 9; i++) {
      const rand = Math.floor(Math.random() * 5) + 1;
      valeurs[i] = rand;
    }

    return valeurs;
  }
  public randomAvg() {
    const valeurs = [];

    for (let i = 0; i <= 9; i++) {
      const rand = Math.floor(Math.random() * 4) + 1;
      valeurs[i] = rand;
    }

    return valeurs;
  }



}
