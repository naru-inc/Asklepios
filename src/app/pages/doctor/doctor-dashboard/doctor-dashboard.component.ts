import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from 'firebase/app';
import { PatientService } from '../../../services/patient.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

export interface Patient {
  id: string;
  name: string;
  sex: string;
  age: number,
  rdv: any[]
}
export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {
  firestore: any;
  patients: any = [];
  patient: any;
  ispatient: boolean = false;
  patient1: any;
  patient2: any;
  patient3: any;
  patient4: any;
  patient5: any;
  numberOfpatients:any;
  male: any;
  female: any;
  today:any;
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
  public PerSex: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public AgeOptions: ChartOptions = {
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
  public AgeLabels: Label[] = ['>6 Ans', '6-12 Ans', '12-19 Ans', '20-25 Ans', '25-40 Ans','40-60 Ans','<60 Ans'];
  public ScoresLabels: Label[] = ['Douleur', 'Fatigue', 'Nausée', 'Migraine', 'Dépression', 'Anxiété', 'Somnolence', 'Bien-être', 'Souffle', 'Appétit'];
  public SexLabels: Label[] = ['Male', 'Female'];

  public ScoresChart: ChartType = 'line';
  public barChartLegend = true;
  public SexType: ChartType = 'pie';
  public SexLegend = true;
  public AgeChart: ChartType = 'radar';
  public AgeData: ChartDataSets[] = [
    { data: this.male, label: "N. OP" },
  ];
  public AgeLegend = true;
  public AgeColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: '#03A9F4',
    }
  ];
  public SexColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: '#03A9F4',
    },
    {
      borderColor: 'white',
      backgroundColor: '#03A9F4',

    }
  ];
  public SexData: ChartDataSets[] = [
    { data: this.male, label: "Male" },
    { data: this.female, label: "Female" }
  ];
  public ScoresColors: Color[] = [
    {
      borderColor: '#1E88E5',
      backgroundColor: 'transparent',

    },
    {
      borderColor: '#2196F3',
      backgroundColor: 'transparent',
    },
    {
      borderColor: '#42A5F5',
      backgroundColor: 'transparent',
    },
    {
      borderColor: '#64B5F6',
      backgroundColor: 'transparent',
    },
    {
      borderColor: '#90CAF9',
      backgroundColor: 'transparent',
    }
  ];
  public ScoresData: ChartDataSets[] = [
    { data: this.patient1, label: "Name 1" },
    { data: this.patient2, label: "Name 2" },
    { data: this.patient3, label: "Name 3" },
    { data: this.patient4, label: "Name 4" },
    { data: this.patient5, label: "Name 5" }
  ];

  folders: Section[] = [
    {
      name: 'Bilans',
      updated: new Date('7/19/19'),
    },
    {
      name: 'Analyses Laboratoires',
      updated: new Date('6/20/19'),
    },
    {
      name: 'Images & Radiologie',
      updated: new Date('6/28/19'),
    }
  ];
  files: Section[] = [
    {
      name: 'Bilan lipidique | Lelia Chestnut',
      updated: new Date('7/20/19'),
    },
    {
      name: 'Radiographie Pulmonaire | Shannon Polin',
      updated: new Date('6/18/19'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Analyse des bilans | Lelia Chestnut',
      updated: new Date('7/20/19'),
    },
    {
      name: 'Observation sur Radiographie | Shannon Polin',
      updated: new Date('6/19/19'),
    }
  ];
  constructor(private router: Router, private data: PatientService) {
    this.firestore = firebase.firestore();
  }

  ngOnInit() {
    this.getPatients();
    this.patient = false;
    this.today=new Date()
    console.log(this.patient)
  }

  getStyles(val) {
    let styles = {
      'float': 'right',
      'width': '17px',
      'height': '17px',
      'background-color': val ? '#e53935' : '#43A047'
    };
    return styles;
  }
  navigateToPatient(patient) {
    this.data.changePatient(patient);
    this.router.navigate(['doctor/patient/']);
  }
  randomDate(start, end) {
    let duestart = new Date(start.setHours(0, 0, 0, 0));
    let dueend = new Date(end.setHours(24, 0, 0, 0));
    return new Date((duestart.getTime() + Math.random() * (dueend.getTime() - duestart.getTime())));
  }
  public randomTodayDate(patient) {
    var obvs = [true, false]
    var rds = ["Controle", "Chimio", "Urgence", "Premier Rendez-vous"]
    let Today = new Date()
    let duestart = new Date(Today.setHours(9, 0, 0, 0));
    let dueend = new Date(Today.setHours(19, 0, 0, 0));
    patient.todayDate = new Date((duestart.getTime() + Math.random() * (dueend.getTime() - duestart.getTime())));
    patient.rdvType = rds[Math.floor(Math.random() * rds.length)]
    patient.presence = obvs[Math.floor(Math.random() * obvs.length)]
  }
  public getPatients() {
    var rendezvous = []
    var obvs = [true, false]
    var rds = ["Controle", "Chimio", "Urgence", "Premier Rendez-vous"]
    var sex = ["M", "F"]
    var obvs = [true, false]
    var rds = ["Controle", "Chimio", "Urgence", "Premier Rendez-vous"]
    var names = ["Hang Lemoine",
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
      "Bess Espitia"];
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var randomtype = Math.floor(Math.random() * rds.length);
        var random_boolean = Math.random() >= 0.5;
        rendezvous[j] = {
          date: this.randomDate(new Date(), new Date(2020, 0, 1)),
          type: rds[randomtype],
          observations: random_boolean
        }
      }
      rendezvous.sort((a, b) => {
        return <any>new Date(b.date) - <any>new Date(a.date);
      });
      this.patients[i] = {
        id: (i + 1).toString(),
        name: names[Math.floor(Math.random() * 10) + 0],
        age: Math.floor(Math.random() * 45) + 55,
        sex: sex[Math.floor(Math.random() * 2) + 0],
        rdv: rendezvous
      }
      this.randomTodayDate(this.patients[i])
    }
    this.patients.sort((a, b) => {
      return <any>new Date(b.todayDate) - <any>new Date(a.todayDate);
    });
    console.log(this.patients)
    this.getFollowedPatients()
    this.getSex()
    this.getAge()
  }
  getSex() {
    this.male = this.randomSex()
    this.female = 100 - this.male
    this.SexData = [
      { data: this.male, label: "Male" },
      { data: this.female, label: "Female" }
    ]
  }
  getFollowedPatients() {
    this.patient1 = this.random();
    this.patient2 = this.random()
    this.patient3 = this.random()
    this.patient4 = this.random()
    this.patient5 = this.random()
    this.ScoresData = [
      { data: this.patient1, label: this.patients[0].name },
      { data: this.patient2, label: this.patients[3].name },
      { data: this.patient3, label: this.patients[7].name },
      { data: this.patient4, label: this.patients[4].name },
      { data: this.patient5, label: this.patients[2].name }
    ]
  }
  public random() {
    const valeurs = [];

    for (let i = 0; i <= 9; i++) {
      const rand = Math.floor(Math.random() * 9) + 1;
      valeurs[i] = rand;
    }

    return valeurs;
  }
  public randomSex() {
    return Math.floor(Math.random() * 80) + 20;
  }
  getAge() {
    this.numberOfpatients = this.randomAge()
    this.AgeData = [
      { data: this.numberOfpatients, label: "N. OP" },
    ]
  }
  

  public randomAge() {
    const valeurs = [];

    for (let i = 0; i < 7; i++) {
      const rand = Math.floor(Math.random() * 100) + 1;
      valeurs[i] = rand;
    }

    return valeurs;
  }
}

