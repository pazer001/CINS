import { Component, OnInit } from '@angular/core';
import {LayoutService} from "../../services/layout.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(private layoutService: LayoutService) {

  }



  ngOnInit() {
  }

}
