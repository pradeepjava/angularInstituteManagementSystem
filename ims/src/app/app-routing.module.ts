import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ActivecourseComponent } from './courses/course/activecourse/activecourse.component';
import { AddcourseComponent } from './courses/course/addcourse/addcourse.component';
import { EditCourseComponent } from './courses/course/edit-course/edit-course.component';
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
  {path: 'addCourse', component:AddcourseComponent, canActivate:[RouteGuardService]},
  {path:'activeCourse',component:ActivecourseComponent, canActivate:[RouteGuardService]},
  {path:'course/:id', component:EditCourseComponent, canActivate:[RouteGuardService]},
  { path: 'error', component: ErrorComponent},
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
