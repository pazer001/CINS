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
      this.dataService.ratedMedia[mediaId]  = data;
    })
  }

  getLatestMedia(userId = null) {
    this.dataService.getLatestMedia(userId).subscribe(media => {
      this.dataService.currentSelectedSubTopicMedia = media;
      this.dataService.setFilter('All');
    });
  }

  postUserMediaSave(userId, mediaId) {
    this.dataService.postUserMediaSave(userId, mediaId).subscribe(result => {
      if(result.code === 200) {
        this.dataService.savedMedia(this.dataService.userDetails.data.Id).subscribe(result => {
          if(result.code === 200 && result.data.length) {
            this.dataService.savedMediaData   = result.data;
          }
        })
      }
    })
  }

  ngOnInit() {
    if(!this.dataService.currentSelectedSubTopic) {
      this.getLatestMedia(this.dataService.userDetails.data.Id || null);
    }
  }
}
