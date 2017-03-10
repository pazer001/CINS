import {Component, OnInit} from '@angular/core';
import {DataService} from "./services/data.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private dataService: DataService, private cookieService: CookieService) {

  }

  ngOnInit() {
    if(this.cookieService.get('userLoggedIn')) {
      this.dataService.userDetails    = JSON.parse(localStorage.getItem('userDetails'));
      Observable.timer(0, 60000 * 20).subscribe(() => {
        this.dataService.keepAlive(this.dataService.userDetails.data.Id).subscribe()
      })

    } else {
      localStorage.removeItem('userDetails');
    }
  }
}
