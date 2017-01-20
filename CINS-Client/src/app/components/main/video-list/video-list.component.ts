import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  providers: [DataService]
})
export class VideoListComponent implements OnInit {
  constructor(public data: DataService) {

  }

  ngOnInit() {
  }
}
