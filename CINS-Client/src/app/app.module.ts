import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {appRoutes} from './app.routing';


import { AppComponent } from './app.component';

import {DataService} from './services/data.service';
import {LayoutService} from './services/layout.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoModalComponent } from './components/modals/video-modal/video-modal.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { SearchComponent } from './components/search/search.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TrimPipe } from './pipes/trim.pipe';
import { AddMediaComponent } from './components/add-media/add-media.component';
import { SavedMediaComponent } from './components/saved-media/saved-media.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    NavigationComponent,
    VideoListComponent,
    VideoModalComponent,
    UserLoginComponent,
    SearchComponent,
    NotFoundComponent,
    TrimPipe,
    AddMediaComponent,
    SavedMediaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService, CookieService, LayoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
