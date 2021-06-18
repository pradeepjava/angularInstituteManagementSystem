import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constentProvider';

export class CourseDetails {
  constructor(public courseId: number,
    public courseName: string,
    public courseFee: number,
    public status: string,
    public approveStatus: string,
    public approveDate:Date
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})

export class CourseserviceService {
  constructor(private http: HttpClient) { }

  saveCourseInDB(courseName: string, courseFee: number, status: string) {
    return this.http.post<CourseDetails>(`${API_URL}/courseDetails/saveCourse`, { courseName, courseFee, status })
  }

  updateCourseInDB(courseToUpdate: CourseDetails) {
    return this.http.put<CourseDetails>(`${API_URL}/courseDetails/update`,
      courseToUpdate)
  }

  approveCourseInDB(coursesToUpdate: CourseDetails[]) {
    return this.http.put<CourseDetails>(`${API_URL}/courseDetails/approveAll`,
    coursesToUpdate)
  }

  getAllActiveCourse(courseType:string) {
    return this.http.get<CourseDetails[]>(`${API_URL}/courseDetails/${courseType}`);
  }

  deleteCourse(id: number) {
    return this.http.delete(`${API_URL}/courseDetails/delete/${id}`)
  }
  getCourseById(id: number) {
    return this.http.get<CourseDetails>(`${API_URL}/courseDetails/${id}`);
  }
  getCourseBySearchText(text: String) {
    return this.http.get<CourseDetails[]>(`${API_URL}/courseDetails/searchCourseByText?text=${text}`);
  }
}
