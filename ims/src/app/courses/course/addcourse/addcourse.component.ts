import { Component, OnInit } from '@angular/core';
import { CourseserviceService } from 'src/app/service/courseservice.service';
import { map } from 'rxjs/operators';

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
  constructor(private courseService: CourseserviceService) { }

  ngOnInit(): void {
  }
  saveCourse() {
    if (this.validateForm()) {
      this.spinn = true;
      this.showMessageForSaveStatus = false;
      this.recordSaved = true;
    
      this.courseService.saveCourseInDB(this.course, this.fee, this.status).subscribe(data => {
        console.log("its right")
        console.log(data)
        console.log(data.courseId)
        this.recordSaved = true;
       
      },
        error => {
          console.log("special error")
        })
      this.spinn = false;
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
