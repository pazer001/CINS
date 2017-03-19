import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'ReactJS', component: MainComponent, data: {subTopicName: 'ReactJS'}},
  {path: 'ES6', component: MainComponent, data: {subTopicName: 'ES6'}},
  {path: 'Angular', component: MainComponent, data: {subTopicName: 'Angular'}},
  {path: 'MySQL', component: MainComponent, data: {subTopicName: 'Angular'}},
  {path: 'React Native', component: MainComponent, data: {subTopicName: 'React Native'}},
  {path: 'C', component: MainComponent, data: {subTopicName: 'C'}},
  {path: 'C++', component: MainComponent, data: {subTopicName: 'C++'}},
  {path: 'Foundation', component: MainComponent, data: {subTopicName: 'Foundation'}},
  {path: 'Aurelia', component: MainComponent, data: {subTopicName: 'Aurelia'}},
  {path: 'KoaJS', component: MainComponent, data: {subTopicName: 'KoaJS'}},
  {path: 'JavaScript', component: MainComponent, data: {subTopicName: 'JavaScript'}},
  {path: 'Phalcon', component: MainComponent, data: {subTopicName: 'Phalcon'}},
  {path: 'Elixir', component: MainComponent, data: {subTopicName: 'Elixir'}},
  {path: 'PHP', component: MainComponent, data: {subTopicName: 'PHP'}},
  {path: 'COBOL', component: MainComponent, data: {subTopicName: 'COBOL'}},
  {path: 'Clojure', component: MainComponent, data: {subTopicName: 'Clojure'}},
  {path: 'WebRTC', component: MainComponent, data: {subTopicName: 'WebRTC'}},
  {path: 'Apache Solr', component: MainComponent, data: {subTopicName: 'Apache Solr'}},
  {path: 'HTML', component: MainComponent, data: {subTopicName: 'HTML'}},
  {path: 'jQuery', component: MainComponent, data: {subTopicName: 'jQuery'}},
  {path: '**', component: NotFoundComponent},
];
