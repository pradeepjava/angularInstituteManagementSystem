import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseserviceService } from 'src/app/service/courseservice.service';
import { CourseDetails } from 'src/app/service/courseservice.service'


@Component({
  selector: 'app-activecourse',
  templateUrl: './activecourse.component.html',
  styleUrls: ['./activecourse.component.css']
})
export class ActivecourseComponent implements OnInit {
  static activeSearch: boolean = false;
  static staticSearchText = ''
  static isPaginate: boolean = true;
  static staticCourseType: string = '';
  searchText: string = ''
  activeSpinner: boolean = true;
  courseDetailsArray: CourseDetails[] = [];
  p: number = 0;
  isPreviouslySearchPerformed = false;
  constructor(private courseService: CourseserviceService, private route: Router, private activateRoute: ActivatedRoute) { }

  getStaticCourseTypeName() {
    let smallCapsText = ActivecourseComponent.staticCourseType;
    if (smallCapsText.length > 0) {
      let firstChar = smallCapsText.substring(0, 1).toUpperCase();
      if (smallCapsText.length > 1) {
        let restChar = smallCapsText.substring(1, smallCapsText.length);
        return firstChar + restChar;
      }
      return firstChar;
    }
    return '';
  }

  ngOnInit(): void {
    this.activeSpinner = true;
    this.activateRoute.queryParams.subscribe(
      params => {
        let passedType = params['courseType'];
        if (typeof passedType != 'undefined') {
          ActivecourseComponent.staticCourseType = params['courseType'];
         
        }
        this.activeSpinner = false;
        this.executeAfterInit();
      }
    )
  
  }

  private executeAfterInit() {
    this.searchText = ActivecourseComponent.staticSearchText;
    if (!ActivecourseComponent.activeSearch) {
      this.getActiveCourse(ActivecourseComponent.staticCourseType);
    }
    else {
      this.performActiveSearch(ActivecourseComponent.staticSearchText);
    }
  }

  reversePaginate() {
    ActivecourseComponent.isPaginate = !ActivecourseComponent.isPaginate;
  }

  getIsPaginate() {
    return ActivecourseComponent.isPaginate;
  }

  getIsActiveSearch() {
    return ActivecourseComponent.activeSearch;
  }

  getSerchText() {
    return ActivecourseComponent.staticSearchText;
  }
  editMe(id: number) {
    this.route.navigate(['course', id]);
  }

  searchActiveCourse(searchForm: NgForm) {
    if (!ActivecourseComponent.activeSearch && searchForm.valid) {
      const newLocal: string = searchForm.value.searchText;
      if (newLocal.trim().length > 0) {
        this.performActiveSearch(newLocal);
      }
    }
    else if (ActivecourseComponent.activeSearch && this.isPreviouslySearchPerformed) {
      ActivecourseComponent.activeSearch = false;
      ActivecourseComponent.staticSearchText = '';
      this.searchText = ''
      this.isPreviouslySearchPerformed = false;
      this.getActiveCourse(ActivecourseComponent.staticCourseType);
    }
  }

  private performActiveSearch(newLocal: string) {
    this.activeSpinner = true;
    ActivecourseComponent.activeSearch = true;
    this.isPreviouslySearchPerformed = true;
    ActivecourseComponent.staticSearchText = newLocal.trim();
    this.courseService.getCourseBySearchText(newLocal.trim()).subscribe(data => {
      this.courseDetailsArray = data;
      this.activeSpinner = false;
    }
    );
  }

  deleteMe(id: number) {
    const newLocal = confirm("Are you sure to delete?");
    console.log(newLocal)
    if (newLocal) {
      this.activeSpinner = true;
      this.courseService.deleteCourse(id).subscribe(data => {
        this.getActiveCourse(ActivecourseComponent.staticCourseType);
      });
    }
  }

  getActiveCourse(courseToDisplay: string) {
    this.activeSpinner = true;
    this.courseService.getAllActiveCourse(courseToDisplay).subscribe(
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
