import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {LayoutService} from "../../services/layout.service";

@Component({
  selector: 'app-saved-media',
  templateUrl: './saved-media.component.html',
  styleUrls: ['./saved-media.component.css']
})
export class SavedMediaComponent implements OnInit {
  constructor(private dataService: DataService, private layoutService: LayoutService) {}

  deleteUserMediaSave(userId, mediaId) {
    this.dataService.deleteUserMediaSave(userId, mediaId).subscribe(result => {
      if(result.code === 200) this.savedMedia(this.dataService.userDetails.data.Id);
    })
  }

  savedMedia(userId) {
    this.dataService.savedMedia(userId).subscribe(result => {
      this.dataService.savedMediaData   = result.data || [];
    })
  }

  ngOnInit() {
    if(this.dataService.userDetails) {
      this.savedMedia(this.dataService.userDetails.data.Id);
    }
  }

}
