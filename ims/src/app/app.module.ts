import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebardirectorComponent } from './sidebar/sidebardirector/sidebardirector.component';
import { SidebarstudentComponent } from './sidebar/sidebarstudent/sidebarstudent.component';
import { SidebarwelcomemsgComponent } from './sidebar/sidebarwelcomemsg/sidebarwelcomemsg.component';
import { SidebarsuperviserComponent } from './sidebar/sidebarsuperviser/sidebarsuperviser.component';
import { SidebarteacherComponent } from './sidebar/sidebarteacher/sidebarteacher.component';
import { MainmenubarComponent } from './mainmenubar/mainmenubar.component';
import { CollapseComponent } from './mainmenubar/collapse/collapse.component';
import { DisplaycontentComponent } from './displaycontent/displaycontent.component';
import { HomedisplayComponent } from './displaycontent/homedisplay/homedisplay.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login/login.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CoursesComponent } from './courses/courses.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { LoginSuccessComponent } from './login-success/login-success.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebardirectorComponent,
    SidebarstudentComponent,
    SidebarwelcomemsgComponent, SidebarComponent,
    SidebarsuperviserComponent, SidebarteacherComponent,
    MainmenubarComponent, CollapseComponent, DisplaycontentComponent,
    HomedisplayComponent, FooterComponent, LoginComponent, LogoutComponent, AboutusComponent, CoursesComponent, ErrorComponent, LoginSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
