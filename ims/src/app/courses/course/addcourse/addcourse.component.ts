import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  saveCourse() {
    if(this.validateForm()){
      console.log(this.course)
      console.log(this.fee)
      console.log(this.status)
    }
  }

  validateForm(): boolean {
    this.validCourse = this.course.trim().length < 1 ? false : true;
    this.validFee = this.fee < 0 ? false : true;
    this.validStatus = this.status.trim().length < 1 ? false : true;
    return this.validCourse && this.validFee && this.validStatus ? true : false;
  }
}
