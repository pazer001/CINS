import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'ReactJS', component: MainComponent},
  {path: 'ES6', component: MainComponent},
  {path: 'Angular', component: MainComponent},
  {path: 'MySQL', component: MainComponent},
  {path: 'React Native', component: MainComponent},
  {path: 'C', component: MainComponent},
  {path: 'C++', component: MainComponent},
  {path: 'Foundation', component: MainComponent},
  {path: 'Aurelia', component: MainComponent},
  {path: 'KoaJS', component: MainComponent},
  {path: 'JavaScript', component: MainComponent},
  {path: 'Phalcon', component: MainComponent},
  {path: 'Elixir', component: MainComponent},
  {path: 'PHP', component: MainComponent},
  {path: 'COBOL', component: MainComponent},
  {path: 'Clojure', component: MainComponent},
  {path: 'WebRTC', component: MainComponent},
  {path: 'Apache Solr', component: MainComponent},
  {path: 'HTML', component: MainComponent},
  {path: 'jQuery', component: MainComponent},
  {path: 'Erlang', component: MainComponent},
  {path: '**', component: NotFoundComponent},
];
