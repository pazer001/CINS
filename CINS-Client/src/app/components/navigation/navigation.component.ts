import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {LayoutService} from "../../services/layout.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css'],
  providers: [RouterLink]
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

  constructor(private dataService: DataService, private layoutService: LayoutService, private routerLink: RouterLink) {
    this.mainTopics = [];
    this.subTopicsIds = [];
    this.activeNavigationMainTopic = null;
    this.lastTileTypeIndex = null;
    this.tilesTypes = ['tile-large', 'tile-square', 'tile-small', 'tile-small', 'tile-small', 'tile-small', 'tile-wide'];
    this.tilesColors = ['bg-darkRed', 'bg-blue', 'bg-darkGreen', 'bg-yellow', 'bg-darkOrange'];
    this.navigation = null;
  }

  setCurrentSelectedSubTopic(subTopic) {
    this.dataService.setCurrentSelectedSubTopic(subTopic);
    this.layoutService.toggleFooterButtonsActive('startMenuActive');
  }

  setActiveNavigationMainTopic(navigationMainTopic) {
    this.activeNavigationMainTopic = navigationMainTopic;
    this.setActiveNavigation('subTopics')
  }

  setActiveNavigation(navigation) {
    if (this.navigation === navigation) {
      navigation = null;
      return;
    };
    this.navigation = navigation;
  }

  ngOnInit() {
    this.dataService.getAllTopics().subscribe(data => {
      this.allTopics = Object.assign({}, data);
      for (let mainTopicIndex in data) {
        this.mainTopics.push(data[mainTopicIndex][0])
      }

      this.dataService.setMySubTopics(data);

      //Get latest media by route
      if (this.dataService.currentSubTopicName) {
        let routeSubTopic = this.dataService.subTopics.filter(subTopic => subTopic.Name === this.dataService.currentSubTopicName);
        if (routeSubTopic) {
          this.dataService.setCurrentSelectedSubTopic(routeSubTopic[0])
        }
      } else { //Get latest media if no route present - show all media if no user logged
        this.dataService.getLatestMedia(this.dataService.userDetails ? this.dataService.userDetails.data.Id : null).subscribe(media => {
          this.dataService.currentSelectedSubTopicMedia = media;
          this.dataService.setFilter('All');
        });
      }
    });
  }
}
