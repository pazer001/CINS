import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {LayoutService} from "../../services/layout.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults: any;
  constructor(private dataService: DataService, private layoutService: LayoutService) {
    this.searchResults  = [];
  }

  search(term) {
    this.dataService.search(term).subscribe(result => {
      this.searchResults  = result;
      // this.layoutService.toggleFooterButtonsActive('startMenuActive');
    });
  }
  ngOnInit() {
  }

}
