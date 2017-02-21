import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import 'jquery';
// import 'metro-dist/js/metro.min.js';
import {LayoutService} from "../../services/layout.service";

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css']
})
export class NavigationComponent implements OnInit {
  allTopics: any;
  mainTopics: any;
  activeNavigationMainTopic: string;
  lastTileTypeIndex: number;
  tilesTypes: Array<string>;
  tilesColors: Array<string>;
  navigation: string;
  subTopicsIds: Array<string>;
  // mySubTopics: Array<string>;

  constructor(private dataService: DataService, private layoutService: LayoutService) {
    this.dataService.getAllTopics().subscribe(data => {
      this.allTopics      = data;
      this.mainTopics     = Object.keys(data);
      this.subTopicsIds   = [];
      this.dataService.setMySubTopics(data);


    } );


    this.activeNavigationMainTopic  = null;
    this.lastTileTypeIndex          = null;
    this.tilesTypes                 = ['tile-large', 'tile-square', 'tile-small','tile-small', 'tile-small', 'tile-small', 'tile-wide'];
    this.tilesColors                = ['bg-darkRed', 'bg-blue', 'bg-darkGreen', 'bg-yellow', 'bg-darkOrange'];
    this.navigation                 = null;
  }

  setCurrentSelectedSubTopic(subTopic) {
    this.dataService.setCurrentSelectedSubTopic(subTopic);
    this.layoutService.toggleFooterButtonsActive('startMenuActive');
  }

  setActiveNavigationMainTopic(navigationMainTopic) {
    this.activeNavigationMainTopic  = navigationMainTopic;
    this.setActiveNavigation('subTopics')
  }

  setActiveNavigation(navigation) {
    if(this.navigation = navigation) {
      navigation = null;
      return;
    };
    this.navigation   = navigation;
  }

  ngOnInit() {

  }
}
