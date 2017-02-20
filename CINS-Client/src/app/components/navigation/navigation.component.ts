import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import 'jquery';
import 'metro-dist/js/metro.min.js';
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
  icons: any;
  noIcons: any;
  constructor(private dataService: DataService, private layoutService: LayoutService) {
    this.allTopics      = this.dataService.getAllTopics().subscribe(data => {
      this.allTopics    = data;
      this.mainTopics   = Object.keys(data);
    } );


    this.activeNavigationMainTopic  = null;
    this.lastTileTypeIndex          = null;
    this.tilesTypes                 = ['tile-large', 'tile-square', 'tile-small','tile-small', 'tile-small', 'tile-small', 'tile-wide'];
    this.tilesColors                = ['bg-darkRed', 'bg-blue', 'bg-darkGreen', 'bg-yellow', 'bg-darkOrange'];
    this.icons                      = {
      'C#': 'csharp',
      'C++': 'cplusplus',
      'Go': 'go',
    };
    this.noIcons                    = {
      'Pascal': 'http://www.filetypes.ru/uploads/ext/4427.png',
      'Clojure': 'https://www.shareicon.net/data/2016/06/19/603743_clojure_512x512.png',
      'COBOL': 'http://www.mainframestechhelp.com/img/cobol.png',
      'Elixir': 'http://jobs.elixirdose.com/images/elixir-logo.png',
      'Fortran': 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Fortran.png',
      'LISP': 'http://findicons.com/files/icons/2773/pictonic_free/512/prog_lisp.png',
      'MATLAB': 'http://www.phidgets.com/wiki/images/b/b1/Icon-Matlab.png',
      'Objective C': 'http://cc.cocimg.com/api/uploads/20160601/1464776396717413.png',
      'R': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/R_logo.svg/724px-R_logo.svg.png',
      'Scala': 'http://www.yoppworks.com/wp-content/uploads/2016/05/Scala-Icon.png',
      'Swift': 'https://cdn.macrumors.com/article-new/2014/06/swift.png?retina',
    };
  }

  setCurrentSelectedSubTopic(subTopic) {
    this.dataService.setCurrentSelectedSubTopic(subTopic)
    this.layoutService.toggleFooterButtonsActive('startMenuActive');
  }

  setActiveNavigationMainTopic(navigationMainTopic) {
    console.log(this.allTopics[navigationMainTopic])
    this.activeNavigationMainTopic  = navigationMainTopic;
  }

  mainTopicIcon(topicName) {
    return this.noIcons[topicName] ? null : `icon devicon-${ this.icons[topicName] || topicName.toLocaleLowerCase()}-plain`;
  }

  ngOnInit() {

  }
}
