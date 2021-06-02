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


@NgModule({
  declarations: [
    AppComponent,
    SidebardirectorComponent,
    SidebarstudentComponent,
    SidebarwelcomemsgComponent,SidebarComponent,
     SidebarsuperviserComponent, SidebarteacherComponent,
      MainmenubarComponent, CollapseComponent, DisplaycontentComponent, 
      HomedisplayComponent, FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
