import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseserviceService } from 'src/app/service/courseservice.service';
import { CourseDetails } from 'src/app/service/courseservice.service'


@Component({
  selector: 'app-activecourse',
  templateUrl: './activecourse.component.html',
  styleUrls: ['./activecourse.component.css']
})
export class ActivecourseComponent implements OnInit {
  activeSpinner: boolean = true;
  courseDetailsArray: CourseDetails[] = [];
  constructor(private courseService: CourseserviceService, private route: Router) { }

  ngOnInit(): void {
    this.getActiveCourse();
  }

  editMe(id: number) {
    this.route.navigate(['course', id]);
  }

  deleteMe(id: number) {
    const newLocal = confirm("Are you sure to delete?");
    console.log(newLocal)
    if (newLocal) {
      this.activeSpinner = true;
      this.courseService.deleteCourse(id).subscribe(data => {
        this.getActiveCourse();
      });
    }
  }

  getActiveCourse() {
    this.activeSpinner = true;
    this.courseService.getAllActiveCourse().subscribe(
      data => {
        let courseArray: CourseDetails[];
        courseArray = data;
        courseArray.sort((a, b) => {
          return a.courseId - b.courseId;
        })
        this.courseDetailsArray = courseArray;
        this.activeSpinner = false;
      },
      error => {
        console.log(error);
        this.activeSpinner = false;
      }
    );
  }
}
