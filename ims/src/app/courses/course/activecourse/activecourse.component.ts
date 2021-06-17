import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseserviceService } from 'src/app/service/courseservice.service';
import { CourseDetails } from 'src/app/service/courseservice.service'


@Component({
  selector: 'app-activecourse',
  templateUrl: './activecourse.component.html',
  styleUrls: ['./activecourse.component.css']
})
export class ActivecourseComponent implements OnInit {
  searchText: string = ''
  static activeSearch: boolean = false;
  static staticSearchText=''
  activeSpinner: boolean = true;
  courseDetailsArray: CourseDetails[] = [];
  isPreviouslySearchPerformed = false;
  constructor(private courseService: CourseserviceService, private route: Router) { }

  ngOnInit(): void {
    this.searchText=ActivecourseComponent.staticSearchText;
    if (!ActivecourseComponent.activeSearch)
      this.getActiveCourse();
    else
      this.performActiveSearch(ActivecourseComponent.staticSearchText);
  }

  getIsActiveSearch() {
    return ActivecourseComponent.activeSearch;
  }
  getSerchText()
  {
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
      ActivecourseComponent.staticSearchText='';
      this.searchText=''
      this.isPreviouslySearchPerformed = false;
      this.getActiveCourse();
    }
  }

  private performActiveSearch(newLocal: string) {
    this.activeSpinner = true;
    ActivecourseComponent.activeSearch = true;
    this.isPreviouslySearchPerformed = true;
    ActivecourseComponent.staticSearchText=newLocal.trim();
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
