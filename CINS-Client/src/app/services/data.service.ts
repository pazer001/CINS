import { Injectable }     from '@angular/core';
@Injectable()
export class DataService {
  private topics: Array<any>;
  currentSelectedSubTopic: string;
  constructor() {
    this.topics   = [];
    this.topics['JavaScript'] = [
      'ES5',
      'ES2015',
      'ES2016',
      'jQuery',
      'jQueryUI',
      'Angular',
      'Angular 2',
      'Angular Material',
      'BackboneJS',
      'GWT',
      'KnockoutJS',
      'KoaJS',
      'Mootools',
      'Prototype',
      'ReactJS',
      'Typescript',
      'WebGL',
      'WebRTC',
      'Socket.IO',
      'EmberJS',
      'ExtJS',
      'Highcharts',
    ];
    this.topics['NodeJS']   = [
      'NodeJS',
      'KoaJS',
      'ExpressJS'
    ];
    this.topics['CSS']  = [
      'CSS',
      'Bootstrap',
      'Materialize',
      'Foundation',
      'Pure.CSS',
      'SASS',
      'LESS',
    ];
    this.topics['PHP'] = [
      'PHP 5',
      'PHP 7',
      'Laravel',
      'Lumen',
      'CakePHP',
      'Codeigniter'
    ];
  }

  getTopics() {
    return this.topics
  }

  getCurrentSelectedSubTopic() {
    return this.currentSelectedSubTopic;
  }

  setCurrentSelectedSubTopic(subTopic) {
    this.currentSelectedSubTopic = subTopic;
  }
}
