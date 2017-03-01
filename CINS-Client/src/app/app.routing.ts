import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'React', component: MainComponent, data: {subTopicName: 'React'}},
  {path: 'ES6', component: MainComponent, data: {subTopicName: 'ES6'}},
  {path: 'Angular', component: MainComponent, data: {subTopicName: 'Angular'}},
  {path: 'MySQL', component: MainComponent, data: {subTopicName: 'Angular'}},
  {path: 'React Native', component: MainComponent, data: {subTopicName: 'React Native'}},
  {path: 'C', component: MainComponent, data: {subTopicName: 'C'}},
  {path: 'C++', component: MainComponent, data: {subTopicName: 'C++'}},
  {path: 'Foundation', component: MainComponent, data: {subTopicName: 'Foundation'}},
  {path: '**', component: NotFoundComponent},
];
