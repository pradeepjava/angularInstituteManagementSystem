import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseserviceService } from 'src/app/service/courseservice.service';
import { map } from 'rxjs/operators';
import { SpinnerServiceService } from 'src/app/service/spinner-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})

export class AddcourseComponent implements OnInit {

  course: string = '';
  fee: number = 0;
  status: string = '';
  validCourse: boolean = true;
  validFee: boolean = true;
  validStatus: boolean = true;
  recordSaved = false;
  showMessageForSaveStatus = false;
  spinn = false;
  errorMessage=''
  constructor(private courseService: CourseserviceService,
    private spinnerService: SpinnerServiceService,
    private cdrf: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.init();
  }
  init() {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.spinn = status == 'start';
      this.cdrf.detectChanges();
    })
  }
  saveCourse(form : NgForm) {
    
    if (this.validateForm()) {
      this.spinnerService.requstStarted();
      this.showMessageForSaveStatus = false;
      this.courseService.saveCourseInDB(this.course, this.fee, this.status).subscribe(data => {
        this.recordSaved = true;
        form.resetForm();
      },
        error => {
          this.errorMessage=error.error.message;
          this.recordSaved = false;
        })
      this.spinnerService.requestEndned();
      this.showMessageForSaveStatus = true;
    }

  }

  validateForm(): boolean {
    this.validCourse = this.course.trim().length < 1 ? false : true;
    this.validFee = this.fee < 0 ? false : true;
    this.validStatus = this.status.trim().length < 1 ? false : true;
    return this.validCourse && this.validFee && this.validStatus ? true : false;
  }

}
