import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-single-patient',
  templateUrl: './single-patient.component.html',
  styleUrls: ['./single-patient.component.scss']
})
export class SinglePatientComponent implements OnInit {

  public lineChartLegend = 'symptoms';

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 68, 29, 10, 81, 66, 22, 40, 3, 55, 16, 35, 85, 60, 40, 62, 55, 12], label: 'Douleur' },
    { data: [6, 59, 80, 81, 56, 55, 40, 12, 29, 10, 81, 47, 22, 40, 12, 55, 16, 35, 88, 60, 40, 13, 55, 12], label: 'Fatigue' },
    { data: [0, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Vomissement' },
  ];
  public lineChartLabels: Label[] = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8',
   '8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17',
  '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-0'];

  public lineChartColors: Color[] = [
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
  public lineChartType = 'bar';
  public lineChartPlugins = [];


  constructor() { }

  ngOnInit() {
  }

}
