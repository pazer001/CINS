import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'Assembly', component: MainComponent},
  {path: 'ReactJS', component: MainComponent},
  {path: 'ES6', component: MainComponent},
  {path: 'Angular', component: MainComponent},
  {path: 'MySQL', component: MainComponent},
  {path: 'React Native', component: MainComponent},
  {path: 'C', component: MainComponent},
  {path: 'C++', component: MainComponent},
  {path: 'C Sharp', component: MainComponent},
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
  {path: 'Apache Flume', component: MainComponent},
  {path: 'Apache Solr', component: MainComponent},
  {path: 'Apache Kafka', component: MainComponent},
  {path: 'Android', component: MainComponent},
  {path: 'Memcached', component: MainComponent},
  {path: 'DocumentDB', component: MainComponent},
  {path: 'H2', component: MainComponent},
  {path: 'MariaDB', component: MainComponent},
  {path: 'MongoDB', component: MainComponent},
  {path: 'Neo4j', component: MainComponent},
  {path: 'NodeJS', component: MainComponent},
  {path: 'DotNET', component: MainComponent},
  {path: 'AWS', component: MainComponent},
  {path: 'Azure', component: MainComponent},
  {path: 'Backbone', component: MainComponent},
  {path: 'Symfony', component: MainComponent},
  {path: 'CodeIgniter', component: MainComponent},
  {path: 'ExpressJS', component: MainComponent},
  {path: 'Native Script', component: MainComponent},
  {path: 'LISP', component: MainComponent},
  {path: 'Elixir', component: MainComponent},
  {path: 'Go', component: MainComponent},
  {path: 'MATLAB', component: MainComponent},
  {path: 'Objective C', component: MainComponent},
  {path: 'R', component: MainComponent},
  {path: '**', component: NotFoundComponent},
];
