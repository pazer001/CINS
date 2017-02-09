import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../services/data.service";
import 'jquery';
import 'metro-dist/js/metro.min.js';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  allTopics: any;
  mainTopics: any;
  constructor(private data: DataService) {
    this.allTopics      = this.data.getAllTopics().subscribe(data => {
      this.allTopics    = data;
      this.mainTopics   = Object.keys(data);
    } );
  }

  setCurrentSelectedSubTopic(subTopic) {
    this.data.setCurrentSelectedSubTopic(subTopic)
  }

  ngOnInit() {
  }
}
