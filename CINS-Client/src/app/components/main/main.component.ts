import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.dataService.currentSubTopicName  = this.route.snapshot.url[0] ? this.route.snapshot.url[0].path : null;
  }

  ngOnInit() {
  }

}
