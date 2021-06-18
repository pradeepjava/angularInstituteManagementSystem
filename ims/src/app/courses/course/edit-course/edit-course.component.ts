import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDetails, CourseserviceService } from 'src/app/service/courseservice.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  validationError: boolean = false;
  serverError: boolean = false;
  displayError: boolean = false;
  spinn: boolean = false;
  id: number = 0;
  public courseDetails: CourseDetails = new CourseDetails(0, 'a', 0, 'a', 'a', new Date() );
  activeSpinner: boolean = false;
  constructor(private courseService: CourseserviceService, 
    private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.initData()
  }

  cancelMe() {
    this.router.navigate(['/activeCourse']);
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.spinn = true;
      let courseDetailsToUpdate = new CourseDetails(this.courseDetails.courseId, form.value.courseName, form.value.courseFee, form.value.status, this.courseDetails.approveStatus, new Date())
      this.courseService.updateCourseInDB(courseDetailsToUpdate).subscribe(
        data => {
          this.spinn = false;
          this.router.navigate(['/activeCourse']);
        },
        error => {
          this.spinn = false;
          this.displayError = true;
          this.serverError = true;
          console.log(error)
        }
      );
    }
    else {
      this.validationError = true;
      this.displayError = true;
    }
  }
  initData() {
    this.activeSpinner = true;
    this.id = this.activateRoute.snapshot.params['id'];
    this.courseService.getCourseById(this.id).subscribe(data => {
      this.courseDetails = data;
      this.activeSpinner = false;
    })
  }
}
