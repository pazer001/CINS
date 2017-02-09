import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {CookieService} from 'angular2-cookie/core';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  registerFirstName: string;
  registerLastName: string;
  registerEMail: string;
  registerPassword: string;
  registerIcon: string;

  loginEMail: string;
  loginPassword: string;
  loginIcon: string;

  constructor(private dataService: DataService, private cookieService: CookieService) { }

  getUser(loginEMail, loginPassword) {
    let getUser   = {
      EMail: loginEMail,
      Password: loginPassword
    };

    this.loginIcon = `mif-spinner5 mif-ani-spin`;
    this.dataService.getUser(getUser).subscribe(data => {
      this.dataService.userDetails  = data;
      localStorage.setItem('userDetails', JSON.stringify(data));

      if(data.code === 200) {
        this.getLatestMedia();
        this.loginIcon  = `mif-checkmark`;
        this.dataService.userLoggedIn  = true;
      } else if(data.code === 400) {
        this.loginIcon  = `mif-cancel`;
        this.dataService.userLoggedIn  = false;
      } else {
        this.loginIcon  = null;
      }
    })
  }

  postUser(registerFirstName, registerLastName, registerEMail, registerPassword) {
    let postUser  = {
      FirstName: registerFirstName,
      LastName: registerLastName,
      EMail: registerEMail,
      Password: registerPassword,
    };

    this.registerIcon = `mif-spinner5 mif-ani-spin`;
    this.dataService.postUser(postUser).subscribe(data => {
      this.dataService.userDetails  = data;

      if(data.code === 200) {
        this.dataService.getUser(data.data.data.Id).subscribe(data => {
          if(data.code === 200) {
            this.getLatestMedia();
            this.dataService.userDetails = data;
            localStorage.setItem('userDetails', JSON.stringify(data));
          }
        });

        this.registerIcon  = `mif-checkmark`;
        this.dataService.userLoggedIn  = true;
      } else if(data.code === 400) {
        this.registerIcon  = `mif-cancel`;
        this.dataService.userLoggedIn  = false;
      } else {
        this.registerIcon  = null;
      }
    })
  }

  userLogout() {
    this.dataService.postUserLogout().subscribe(data => {
      if(data.code === 200) {
        this.dataService.userDetails  = null;
        localStorage.removeItem('userDetails');
        this.dataService.userLoggedIn  = false;
        this.registerIcon  = ``;
      }
    })
  }

  getLatestMedia() {
    this.dataService.getLatestMedia().subscribe(media => {
      this.dataService.currentSelectedSubTopicMedia = media;
      this.dataService.setFilter('All');
    });
  }

  ngOnInit() {
    if(this.cookieService.get('userLoggedIn')) {
      this.dataService.userDetails  = JSON.parse(localStorage.getItem('userDetails'));
      this.dataService.userLoggedIn  = true;
      this.loginIcon  = `mif-checkmark`;
    } else {
      this.registerIcon  = ``;
      localStorage.removeItem('userDetails');
      this.dataService.userLoggedIn  = false;
    }

    this.getLatestMedia();

  }

}
