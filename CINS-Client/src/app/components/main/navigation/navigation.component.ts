import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [DataService]
})
export class NavigationComponent implements OnInit {
  allTopics: any;
  mainTopics: any;
  constructor(private data: DataService) {
    this.mainTopics   = Object.keys(this.data.getTopics());
    this.allTopics    = this.data.getTopics();
  }

  setCurrentSelectedSubTopic(subTopic) {
    this.data.setCurrentSelectedSubTopic(subTopic)
  }

  ngOnInit() {
  }

}
