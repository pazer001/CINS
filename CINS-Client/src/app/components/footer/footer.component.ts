import { Component, OnInit } from '@angular/core';
import {LayoutService} from "../../services/layout.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(private layoutService: LayoutService, private dataService: DataService) {

  }



  ngOnInit() {
  }

}
