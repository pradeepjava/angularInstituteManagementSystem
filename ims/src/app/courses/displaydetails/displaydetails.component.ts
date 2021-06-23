import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseserviceService } from 'src/app/service/courseservice.service';

@Component({
  selector: 'app-displaydetails',
  templateUrl: './displaydetails.component.html',
  styleUrls: ['./displaydetails.component.css']
})
export class DisplaydetailsComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute, private courseService: CourseserviceService) { }
  courseId: number = 0;
  description: string = ''
  ngOnInit(): void {

    this.activateRoute.queryParams.subscribe(
      params => {
        let passedType = params['id'];
        if (typeof passedType != 'undefined') {
          let courseId = parseInt(params['id']);
          this.courseId = courseId;
          this.courseService.getCourseById(courseId).subscribe(data => {
            this.courseService.getDescriptionById(data.descriptionid).subscribe(data => {
              this.description = data.keyfeature;
            })
          })
        }
      }
    )
  }
}
