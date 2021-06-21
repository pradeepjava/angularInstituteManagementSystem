import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CourseDescription, CourseDetails, CourseserviceService } from 'src/app/service/courseservice.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';


@Component({
  selector: 'app-coursedescription',
  templateUrl: './coursedescription.component.html',
  styleUrls: ['./coursedescription.component.css']
})
export class CoursedescriptionComponent implements OnInit {
  selectedFile: File = new File([], '');
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string = '';
  imageName: any;
  imgId: number = 0;

  searchText: string = ''
  activeSpinner: boolean = false;
  courseDetailsArray: CourseDetails[] = [];
  isPreviouslySearchPerformed = false;
  closeResult = '';
  courseIdToPerformEdit: number = 0;

  keyFeature: string = ''
  duration: string = ''
  isValidForm: boolean = true;
  isValidFileSelected: boolean = true;
  errorMessageToDisplay = ''
  generatedCourseDescription: CourseDescription[] = [];
  descriptionId: number = 0;
  displaySample = false;
  isCreateNew: string = ''
  allCourseDescription: CourseDescription[] = [];
  selectedCourseDescription: string = '';
  displayCourseDescriptionForEdit: CourseDescription = new CourseDescription(0, '', '', 0);
  addEditMode: boolean = false;
  viewMode: boolean = false;
  courseIdToPerformView = 0;
  courseDescriptionToPerformView = 0;

  constructor(private httpClient: HttpClient, private courseService: CourseserviceService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  trimDescription(text: string) {
    if (text.length > 25) {
      return text.substring(0, 25);
    }
    return text;
  }
  getUserResponse(text: string) {
    if (text === 'use existing') {
      this.getAllDescription();
    }
    else {
      this.allCourseDescription = [];
    }
    this.isCreateNew = text;
  }

  getAllDescription() {
    this.activeSpinner = true;
    this.courseService.getAllCourseDescription().subscribe(data => {
      this.allCourseDescription = data;
      this.activeSpinner = false;

    })
  }
  updateCourseDetailsForDescription(courseId: number, descriptionId: number) {
    this.courseService.getCourseById(courseId).subscribe(data => {
      let courseDetails: CourseDetails = data;
      let newCourseDetails = new CourseDetails(courseDetails.courseId, courseDetails.courseName, courseDetails.courseFee, courseDetails.status, courseDetails.approveStatus, courseDetails.approveDate, descriptionId);
      this.courseService.updateCourseInDB(newCourseDetails).subscribe(data => {
        alert("Course updated with description.");
        this.modalService.dismissAll();
        this.generatedCourseDescription.splice(0, this.generatedCourseDescription.length);
        this.isCreateNew = ''
        this.performSearch();
      })
    })
  }

  dismissModel() {
    this.modalService.dismissAll();
    this.generatedCourseDescription.splice(0, this.generatedCourseDescription.length);
    this.isCreateNew = ''
  }

  displayForView(id: number) {
   
    this.courseService.getCourseById(id).subscribe(data=>{
      this.courseService.getDescriptionById(data.descriptionid).subscribe(data=>{
        this.displayCourseDescriptionForEdit = data;
        this.displaySampleWithImage(data.imgid);
        console.log(data.imgid)
      })
    })
  }
  displaySampleWithImageDescription() {
    let id = this.getIdOfDescriptionFromString(this.selectedCourseDescription);
    for (let description of this.allCourseDescription) {
      if (description.descriptionid == id) {
        this.displayCourseDescriptionForEdit = description;
        this.displaySampleWithImage(description.imgid);
      }
    }
  }

  displaySampleWithImage(imgid: number) {
    this.getImage(imgid);
    this.displaySample = true;
  }
  onSubmit(form: NgForm) {
    if (this.validForm(form) && this.validFile()) {
      this.isValidForm = true;
      this.errorMessageToDisplay = ''
      this.saveDescription(form);
    }
    else {
      this.isValidForm = false;
      this.errorMessageToDisplay = 'All filds are mandetory. Also check for file format and size'
    }
  }

  saveDescription(form: NgForm) {
    const uploadImageData = new FormData();

    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.courseService.uploadImage(uploadImageData).subscribe(data => {
      let imgId = data.valueOf()
      let courseDescription: CourseDescription = new CourseDescription(0, form.value.keyFeature.trim(), form.value.duration.trim(), imgId);
      this.courseService.saveCourseDescription(courseDescription).subscribe(data => {
        this.generatedCourseDescription.splice(0, this.generatedCourseDescription.length);
        this.generatedCourseDescription.push(data);
        this.descriptionId = data.descriptionid
        form.reset;
      },
        error => {
          this.isValidForm = false;
          this.errorMessageToDisplay = 'Unable To save.'
        }
      )
    },
      error => {
        this.isValidForm = false;
        this.errorMessageToDisplay = 'Invalid File size or server error.'
      }
    )
  }
  isLengthOfDescriptionZero(): boolean {
    return this.selectedCourseDescription.length == 0;
  }
  validFile(): boolean {
    let fileName = this.selectedFile.name.trim();
    let splitted: string[] = fileName.split(".");
    let lastVal = splitted[splitted.length - 1];
    return lastVal === 'jpg' || lastVal === 'jpeg' || lastVal === 'png' || lastVal === 'gif';
  }
  validForm(form: NgForm): boolean {
    return form.value.keyFeature.trim().length > 0 && form.value.duration.trim().length > 0 && this.selectedFile.name.trim().length > 0;

  }
  openForView(content: any, id: number, descriptionId: number) {
    this.addEditMode = false;
    this.viewMode = true;
    this.openModel(content);
  this.displayForView(id)
  }
  openForAddEdit(content: any, id: number) {
    this.addEditMode = true;
    this.viewMode = false;
    this.courseIdToPerformEdit = id;
    this.openModel(content);
  }

  private openModel(content: any) {
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


  isEmptyCourseFound() {
    return this.courseDetailsArray.length == 0;
  }

  isEmptyText(): boolean {
    return this.searchText.trim().length === 0;
  }

  public performSearch() {
    let trimedText = this.searchText.trim();
    if (trimedText.length > 0) {
      this.activeSpinner = true;
      this.isPreviouslySearchPerformed = true;
      this.courseService.getCourseBySearchText(trimedText).subscribe(data => {
        this.courseDetailsArray = data;
        this.activeSpinner = false;
      }
      );
    }

  }

  public onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.courseService.uploadImage(uploadImageData).subscribe(data => {
      let imgId = data.valueOf()
    },
      error => {
        this.isValidForm = false;
        this.errorMessageToDisplay = 'Invalid File size or server error.'
      }
    )
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

  getIdOfDescriptionFromString(selectedCourseDescription: string): number {

    if (selectedCourseDescription.length > 0) {
      const findnum: string = selectedCourseDescription.split("Key:")[0].split("Id:")[1].trim();

      return parseInt(findnum);
    }
    return 0;
  }
}
