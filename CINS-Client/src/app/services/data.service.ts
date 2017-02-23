import {Injectable}     from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs} from '@angular/http';
import {DomSanitizer} from "@angular/platform-browser";
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import {LayoutService} from "./layout.service";
import {CookieService} from "angular2-cookie/services/cookies.service";


@Injectable()
export class DataService {
  currentSelectedSubTopic: any;
  currentSelectedSubTopicMedia: Array<any>;
  currentSelectedSubTopicMediaFiltered: Array<any>;
  selectedVideo: any;
  isVideoModalOpen: boolean;
  isUserLoginModalOpen: boolean;
  userLoggedIn: boolean;
  filter: string;
  userDetails: any;
  ratedMedia: any;
  mySubTopics: Array<string>;
  subTopicsIds: Array<string>;
  subTopics: Array<string>;

  constructor(private http: Http, private domSanitizer: DomSanitizer, private layoutService: LayoutService, private cookieService: CookieService) {
    this.selectedVideo            = null;
    this.isVideoModalOpen         = false;
    this.isUserLoginModalOpen     = false;
    this.userLoggedIn             = false;
    this.currentSelectedSubTopic  = {Name: 'Latest Media'};
    this.filter                   = 'All';
    this.userDetails              = null;
    this.ratedMedia               = {};
    this.mySubTopics              = [];
    this.subTopicsIds             = [];
    this.subTopics                = [];

    if(this.cookieService.get('userLoggedIn')) {
      this.userDetails    = JSON.parse(localStorage.getItem('userDetails'));
      this.userLoggedIn   = true;
    } else {
      localStorage.removeItem('userDetails');
      this.userLoggedIn   = false;
    }

    this.getLatestMedia();
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

    if(this.userDetails.subTopicsSaveIds) {
      for(let subTopicId of this.userDetails.subTopicsSaveIds.data) {
        this.mySubTopics[subTopicId]  = this.subTopicsIds[subTopicId]
      }
    }
  }

  getAllTopics(): Observable<any> {
    return this.http.get(`api/getAllTopics`).map(res => res.json())
  }

  getMedia(Id): Observable<any> {
    return this.http.get(`api/getMedia/${Id}`).map(res => res.json()).map(data => {data.map(video => video.PublishedAt = moment(video.PublishedAt).format('DD/MM/YYYY')); return data;})
  }

  getLatestMedia(): Observable<any> {
    let userId  = this.userDetails ? this.userDetails.data.Id : '0';
    return this.http.get(`api/getLatestMedia/${userId}`).map(res => res.json()).map(data => {data.map(video => video.PublishedAt = moment(video.PublishedAt).format('DD/MM/YYYY')); return data;})
  }

  openMedia(currentSelectedSubTopicVideo) {
    window.open(currentSelectedSubTopicVideo.Url, '_blank').focus();
    this.layoutService.hideFooterButtonsActive();
  }

  closeMedia() {
    this.selectedVideo = null;
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
    this.currentSelectedSubTopic = subTopic;
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

    this.userDetails  = this.http.get(`api/user`, options).map(res => res.json());
    return this.userDetails;
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
    return this.http.get(`api/search/${term}`).map(res => res.json())
  }

  postRequestMedia(data) {
    let headers = new Headers({'content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(`api/requestMedia/`, JSON.stringify(data), options).map(res => res.json())
  }
}
