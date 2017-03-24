import {Component, OnInit} from '@angular/core';
import {DataService} from "./services/data.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(public dataService: DataService) {

  }

  ngOnInit() {
    if(localStorage.getItem('userDetails')) {
      this.dataService.userDetails    = JSON.parse(localStorage.getItem('userDetails'));
      this.dataService.keepAlive(this.dataService.userDetails.data.Id).subscribe();
        Observable.timer(0, 60000 * 20).subscribe(() => {
          this.dataService.keepAlive(this.dataService.userDetails.data.Id).subscribe()
        })
    }
  }
}