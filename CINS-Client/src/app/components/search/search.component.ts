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
  term: string;
  constructor(public dataService: DataService, public layoutService: LayoutService) {
    this.searchResults  = [];
    this.term           = null;
  }

  search(term) {
    if(!term) return;
    this.dataService.search(term).subscribe(result => {
      this.searchResults  = result;
    });
  }
  ngOnInit() {
  }

}
