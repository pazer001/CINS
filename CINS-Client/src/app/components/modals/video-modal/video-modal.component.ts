import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.css']
})
export class VideoModalComponent implements OnInit {
  constructor(public data: DataService) { }

  ngOnInit() {
  }

}
