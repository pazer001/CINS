import { Component, OnInit } from '@angular/core';
import {LayoutService} from "../../services/layout.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.css']
})
export class AddMediaComponent implements OnInit {
  title: string;
  description: string;
  source: string;
  url: string;
  subTopicId: number;
  type: string;
  errors: Array<boolean>;
  requestMediaResult: boolean;

  constructor(public layoutService: LayoutService, public dataService: DataService) {
    this.title                = null;
    this.description          = null;
    this.source               = null;
    this.url                  = null;
    this.subTopicId           = null;
    this.type                 = 'Article';
    this.errors               = [];
    this.requestMediaResult   = null;
  }

  postAddMedia(title, description, source, url, subTopicId, type) {
    let data  = {title, description, source, url, subTopicId, type};
    this.errors       = [];
    for(let input in data) {
      if(!data[input]) {
        this.errors[input] = false;
        return;
      }
    }

    this.dataService.postRequestMedia(data).subscribe(result => {
      this.requestMediaResult   = result
    })

  }

  ngOnInit() {
  }

}
