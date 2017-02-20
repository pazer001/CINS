import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {LayoutService} from "../../services/layout.service";


@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  constructor(public dataService: DataService, public layoutService: LayoutService) {
  }

  postUserTopicsSave(userId, selectedSubTopicId) {
    this.dataService.postUserTopicsSave(userId, selectedSubTopicId).subscribe(data => {
      if (data.code === 200 && this.dataService.userDetails.subTopicsSaveIds && !this.dataService.userDetails.subTopicsSaveIds.data.includes(selectedSubTopicId)) {
        this.dataService.userDetails.subTopicsSaveIds.data.push(selectedSubTopicId);
        localStorage.setItem('userDetails', JSON.stringify(this.dataService.userDetails));
      }
    });
  }

  deleteUserTopicsSave(userId, selectedSubTopicId) {
    this.dataService.deleteUserTopicsSave(userId, selectedSubTopicId).subscribe(data => {
      if (data.code === 200 && this.dataService.userDetails.subTopicsSaveIds && this.dataService.userDetails.subTopicsSaveIds.data.includes(selectedSubTopicId)) {
        this.dataService.userDetails.subTopicsSaveIds.data = this.dataService.userDetails.subTopicsSaveIds.data.filter(id => id !== selectedSubTopicId);
        localStorage.setItem('userDetails', JSON.stringify(this.dataService.userDetails));
      }
    });
  }

  rateMedia(mediaId) {
    this.dataService.rateMedia(mediaId).subscribe(data => {
      // if(data.code === 200) {
      //   this.dataService.ratedMedia[mediaId]  = data.ratedMediaCount;
      // } else {
        this.dataService.ratedMedia[mediaId]  = data;
      // }
    })
  }

  ngOnInit() {

  }
}
