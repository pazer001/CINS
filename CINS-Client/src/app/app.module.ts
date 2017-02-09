import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Jsonp } from '@angular/http';

import { AppComponent } from './app.component';

import {DataService} from './services/data.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/main/navigation/navigation.component';
import { VideoListComponent } from './components/main/video-list/video-list.component';
import { VideoModalComponent } from './components/modals/video-modal/video-modal.component';
import { UserLoginComponent } from './components/modals/user-login/user-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    NavigationComponent,
    VideoListComponent,
    VideoModalComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
