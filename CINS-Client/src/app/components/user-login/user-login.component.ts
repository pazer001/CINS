import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

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

  loginEMail: string;
  loginPassword: string;

  constructor(private dataService: DataService) {

  }

  getUser(loginEMail, loginPassword) {
    let getUser   = {
      EMail: loginEMail,
      Password: loginPassword
    };

    this.dataService.getUser(getUser).subscribe(data => {
      this.dataService.userDetails  = data;
      this.dataService.setMySubTopics(data);
      localStorage.setItem('userDetails', JSON.stringify(data));

      if(data.code === 200) {
        this.getLatestMedia();
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
      }
    })
  }

  userLogout() {
    this.dataService.postUserLogout().subscribe(data => {
      if(data.code === 200) {
        this.dataService.userDetails  = null;
        localStorage.removeItem('userDetails');
      }
    })
  }

  getLatestMedia(userId = null) {
    this.dataService.getLatestMedia(userId).subscribe(media => {
      this.dataService.currentSelectedSubTopicMedia = media;
      this.dataService.setFilter('All');
    });
  }

  deleteAllUserTopicsSave(userId) {
    this.dataService.deleteAllUserTopicsSave(userId).subscribe(result => {
      if(result.code === 200) {
        this.dataService.userDetails.subTopicsSaveIds.data = [];
        localStorage.setItem('userDetails', JSON.stringify(this.dataService.userDetails));
      }
    })
  }

  ngOnInit() {

  }

}
