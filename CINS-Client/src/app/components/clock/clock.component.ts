import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  time: any;
  date: string;
  constructor() {
    this.time   = moment().format('HH:mm');
    this.date   = moment().format('DD-MMM-YY');

  }

  runTimer() {
    let timer = Observable.timer(0,1000);
    timer.subscribe(() => {
      this.time   = moment().format('HH:mm');
      this.date   = moment().format('DD-MMM-YY');
    });
  }

  ngOnInit() {
    this.runTimer();
  }

}
