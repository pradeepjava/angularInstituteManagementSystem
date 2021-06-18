import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseDetails, CourseserviceService } from 'src/app/service/courseservice.service';

@Component({
  selector: 'app-approvecourse',
  templateUrl: './approvecourse.component.html',
  styleUrls: ['./approvecourse.component.css']
})
export class ApprovecourseComponent implements OnInit {
  activeSpinner = false;
  courseDetailsArray: CourseDetails[] = [];
  isAllChecked = false;
  approveArray: number[] = [];
  constructor(private courseService: CourseserviceService, private router: Router) { }



  isNoUnapprovedCourse() {
    this.courseDetailsArray.length == 0;
  }

  insertIntoApproveArray(id: number) {
    if (this.isAlreadyPresent(this.approveArray, id)) {
      let tempArray: number[] = [];
      for (let num of this.approveArray) {
        if (num != id) {
          tempArray.push(num);
        }
      }
      this.approveArray = tempArray;
    }
    else {
      this.approveArray.push(id);
    }
  }

  isAlreadyPresent(array: number[], id: number) {
    for (let num of array) {
      if (num === id) {
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.getUnapprovedCourse("unapproved");
  }

  approvePermanent() {
    if (this.approveArray.length > 0) {
      this.activeSpinner = true;
      let tempCourseDetails: CourseDetails[] = [];
      for (let details of this.courseDetailsArray) {
       if(this.isAlreadyPresent(this.approveArray, details.courseId))
        {
          tempCourseDetails.push(details);
        }
      }
      console.log(tempCourseDetails);
      this.courseService.approveCourseInDB(tempCourseDetails).subscribe(
        data => {
          this.activeSpinner = false;
          this.getUnapprovedCourse("unapproved");
          this.approveArray.splice(0, this.approveArray.length);
        }
      )
    }
  }
  selectAll() {
    if (!this.isAllChecked) {
      this.isAllChecked = true;
      this.approveArray.splice(0, this.approveArray.length);
      for (let details of this.courseDetailsArray) {
        this.approveArray.push(details.courseId);
      }
    }
    else {
      this.isAllChecked = false;
      this.approveArray.splice(0, this.approveArray.length);

    }
  }

  checkEmptyArray() {
    return this.approveArray.length > 0;
  }
  getUnapprovedCourse(courseToDisplay: string) {
    this.activeSpinner = true;
    this.courseService.getAllActiveCourse(courseToDisplay).subscribe(
      data => {
        let courseArray: CourseDetails[];
        courseArray = data;
        courseArray.sort((a, b) => {
          return a.courseId - b.courseId;
        })
        this.courseDetailsArray=[];
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
