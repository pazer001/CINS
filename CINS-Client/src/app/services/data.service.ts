import {Injectable}     from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {DomSanitizer} from "@angular/platform-browser";
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import {LayoutService} from "./layout.service";

@Injectable()
export class DataService {
  currentSelectedSubTopic: any;
  currentSelectedSubTopicMedia: Array<any>;
  currentSelectedSubTopicMediaFiltered: Array<any>;
  selectedVideo: any;
  isVideoModalOpen: boolean;
  isUserLoginModalOpen: boolean;
  filter: string;
  userDetails: any;
  ratedMedia: any;
  mySubTopics: Array<string>;
  subTopicsIds: Array<string>;
  subTopics: any;
  currentSubTopicName: string | null;
  savedMediaData: Array<any>;

  constructor(public http: Http, private domSanitizer: DomSanitizer, public layoutService: LayoutService) {
    this.selectedVideo            = null;
    this.isVideoModalOpen         = false;
    this.isUserLoginModalOpen     = false;
    this.currentSelectedSubTopic  = null;
    this.filter                   = 'All';
    this.userDetails              = null;
    this.ratedMedia               = {};
    this.mySubTopics              = [];
    this.subTopicsIds             = [];
    this.subTopics                = [];
    this.currentSubTopicName      = null;
    this.savedMediaData           = [];
  }

  setMySubTopics(data) {
    for(let mainTopic in data) {
      let mainTopicObject   = data[mainTopic];
      for(let subTopic in mainTopicObject) {
        let subTopicObject  = mainTopicObject[subTopic];
        this.subTopicsIds[subTopicObject.Id]  = subTopicObject.Name;
        this.subTopics.push(subTopicObject)
      }
    }

    if(this.userDetails && this.userDetails.subTopicsSaveIds && this.userDetails.subTopicsSaveIds.data) {
      for(let subTopicId of this.userDetails.subTopicsSaveIds.data) {
        this.mySubTopics[subTopicId]  = this.subTopicsIds[subTopicId]
      }
    }
  }

  getAllTopics(): Observable<any> {
    return this.http.get(`api/allTopics`).map(res => res.json())
  }

  getMedia(Id): Observable<any> {
    return this.http.get(`api/getMedia/${Id}`).map(res => res.json()).map(data => {data.map(video => video.PublishedAt = moment(video.PublishedAt).format('DD/MM/YYYY')); return data;})
  }

  getLatestMedia(userId = null): Observable<any> {
    return this.http.get(`api/getLatestMedia/${userId || 0}`)
        .map(res => res.json())
        .map(data => {
          data.map(video => video.PublishedAt = moment(video.PublishedAt).format('DD/MM/YYYY'));
          return data;
        })
  }

  openMedia(currentSelectedSubTopicVideo) {
    window.open(currentSelectedSubTopicVideo.Url, '_blank').focus();
    this.layoutService.hideFooterButtonsActive();
  }

  closeMedia() {
    this.selectedVideo    = null;
    this.isVideoModalOpen = false;
  }

  getSelectedVideo(videoSource) {
    switch (videoSource) {
      case 'Youtube':
        this.selectedVideo.Url = this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.selectedVideo.Url}/?color=white&iv_load_policy=3&modestbranding=1`);
        break;

      case 'Vimeo':
        this.selectedVideo.Url = this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.selectedVideo.Url}?quality=1080p`);
    }

    return this.selectedVideo;
  }

  getArticleUrl(articleUrl) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(articleUrl);
  }

  setCurrentSelectedSubTopic(subTopic) {
    this.currentSelectedSubTopic = subTopic.Name;
    this.getMedia(subTopic.Id).subscribe(media => {
      this.currentSelectedSubTopicMedia = media;
      this.setFilter('All');
    })
  }

  getUser(getUser): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    for (let i in getUser) {
      params.set(i, getUser[i])
    }
    let options = new RequestOptions({
      search: params
    });

    return this.http.get(`api/user`, options).map(res => res.json());
  }

  postUser(postUser): Observable<any> {
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(`api/user`, JSON.stringify(postUser), options).map(res => res.json())
  }

  postUserLogout(): Observable<any> {
    return this.http.post(`api/userLogout`, null).map(res => res.json())
  }

  setFilter(type = 'All') {
    this.filter = type;
    this.currentSelectedSubTopicMediaFiltered = this.filterMedia(this.filter, this.currentSelectedSubTopicMedia);
  }

  filterMedia(type, media): any {
    switch (type) {
      case 'All':
        return media;
        // break;

      case 'Article':
        return media.filter(mediaItem => mediaItem.Type == 'Article');
        // break;

      case 'Video':
        return media.filter(mediaItem => mediaItem.Type == 'Video');
        // break;
    }
  }

  postUserTopicsSave(userId, selectedSubTopicId): Observable<any> {
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(`api/userTopicsSave/${userId}/${selectedSubTopicId}`, options).map(res => res.json())}

  deleteUserTopicsSave(userId, selectedSubTopicId): Observable<any> {
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.delete(`api/UserTopicsSave/${userId}/${selectedSubTopicId}`, options).map(res => res.json())}

  rateMedia(mediaId): Observable<any> {
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(`api/rateMedia/${mediaId}`, options).map(res => res.json())
  }

  search(term): Observable<any> {
    if(!term) return;
    return this.http.get(`api/search/${term}`).map(res => res.json())
  }

  postRequestMedia(data) {
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(`api/requestMedia/`, JSON.stringify(data), options).map(res => res.json())
  }

  postUserMediaSave(userId, mediaId): Observable<any> {
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(`api/userMediaSave/${userId}/${mediaId}`, options).map(res => res.json())
  }

  deleteUserMediaSave(userId, mediaId): Observable<any> {
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.delete(`api/userMediaSave/${userId}/${mediaId}`, options).map(res => res.json())
  }

  savedMedia(userId) {
    return this.http.get(`api/savedMedia/${userId}`).map(res => res.json());
  }

  deleteAllUserTopicsSave(userId): Observable<any> {
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.delete(`api/allUserTopicsSave/${userId}`, options).map(res => res.json())
  }

  keepAlive(userId): Observable<any> {
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(`api/keepAlive/${userId}`, options).map(res => res.json())
  }
}
