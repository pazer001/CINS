import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
// declare const FB: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private data: DataService) { }

  ngOnInit() {
    // FB.init({
    //   appId      : '364538587264940',
    //   cookie     : false,
    //   xfbml      : true,  // parse social plugins on this page
    //   version    : 'v2.8'
    // });
  }

}
