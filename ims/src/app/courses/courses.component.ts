import { Component, OnInit } from '@angular/core';
import { CompleteCourseDetails, CourseserviceService } from 'src/app/service/courseservice.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  completeApprovedCourse: CompleteCourseDetails[] = [];
  activeSpinner: boolean = false;
  constructor(private courseService: CourseserviceService) { }

  ngOnInit(): void {
    this.loadData()
  }
  getImage(d : CompleteCourseDetails)
  {
    let retrieveResonse = d.imageDetails;
      let base64Data = retrieveResonse.picbyte;
      let retrievedImage = 'data:image/jpeg;base64,' + base64Data;
      return retrievedImage
  }
  
  check() {
    for (let d of this.completeApprovedCourse) {
      console.log(d)
    }
  }
  loadData() {
    this.activeSpinner = true;
    this.courseService.getAllCompleteCourse().subscribe(data => {
      this.completeApprovedCourse = data;

      this.activeSpinner = false;
    })
  }

  trimDescription(text: string) {
    if (text.length > 45) {
      return text.substring(0, 45);
    }
    return text;
  }
}
