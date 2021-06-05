import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CoursesComponent } from './courses/courses.component';
import { HomedisplayComponent } from './displaycontent/homedisplay/homedisplay.component';
import { ErrorComponent } from './error/error.component';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';

const routes: Routes = [
  { path: '', component: HomedisplayComponent },
  { path: 'home', component: HomedisplayComponent },
  { path: 'login', component: LoginComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'courses', component: CoursesComponent },
  {path:'loginSuccess', component: LoginSuccessComponent, canActivate:[RouteGuardService]},
  { path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService]},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
