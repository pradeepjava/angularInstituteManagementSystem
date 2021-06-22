import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseDescription, CourseDetails, CourseserviceService } from 'src/app/service/courseservice.service';

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
  closeResult = '';
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string = '';
  imageName: any;
  imgId: number = 0;
  courseIdToPerformEdit:number=0
  displayCourseDescriptionForEdit: CourseDescription = new CourseDescription(0, '', '', 0);
  constructor(private courseService: CourseserviceService, private router: Router, private modalService: NgbModal) { }

  dismissModel() {
    this.modalService.dismissAll();
  }

  displayForView(content:any, id: number) {
    this.courseIdToPerformEdit=id;
    this.openModel(content);
    this.courseService.getCourseById(id).subscribe(data => {
      this.courseService.getDescriptionById(data.descriptionid).subscribe(data => {
        this.displayCourseDescriptionForEdit = data;

        this.getImage(data.imgid);
        console.log(data.imgid)
      })
    })
  }

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
        if (this.isAlreadyPresent(this.approveArray, details.courseId)) {
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

  getAvailableDescriptionCourse(ar: CourseDetails[]): CourseDetails[] {
    let courseArray: CourseDetails[] = [];
    for (let course of ar) {
      if (course.descriptionid != 0) {
        courseArray.push(course);
      }
    }
    return courseArray;
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

        this.courseDetailsArray = [];
        this.courseDetailsArray = this.getAvailableDescriptionCourse(courseArray);
        this.activeSpinner = false;
      },
      error => {
        console.log(error);
        this.activeSpinner = false;
      }
    );
  }

  getImage(id: number) {
    this.courseService.getImageById(id)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picbyte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
        error => {
          console.log(error)
        }
      );
  }

  openModel(content: any) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      },
        (reason) => {
          this.closeResult =
            `Dismissed ${this.getDismissReason(reason)}`;
        });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
