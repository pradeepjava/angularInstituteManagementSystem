import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constentProvider';

export class CourseDetails {
  constructor(public courseId: number,
    public courseName: string,
    public courseFee: number,
    public status: string,
    public approveStatus: string,
    public approveDate: Date,
    public descriptionid: number
  ) {
  }
}

export class CourseDescription {
  constructor(public descriptionid: number,
    public keyfeature: string,
    public duration: string,
    public imgid: number) {
  }
}

export class CompleteCourseDetails {
  public imageData: any;
  constructor(
    public courseDescription: CourseDescription,
    public courseDetails: CourseDetails,
    private picByte: any) {
    this.imageData = 'data:image/jpeg;base64,' + this.picByte;
  }
}


@Injectable({
  providedIn: 'root'
})

export class CourseserviceService {
  constructor(private http: HttpClient) { }

  getImageById(id: number) {
    return this.http.get(`${API_URL}/image/get/` + id);
  }
  getDescriptionById(id: number) {
    return this.http.get<CourseDescription>(`${API_URL}/courseDetails/courseDescription/${id}`);
  }
  getCompleteCourseById(id: number) {
    return this.http.get<CourseDetails>(`${API_URL}/courseDetails/completeCourse/${id}`);
  }

  getAllCourseDescription() {
    return this.http.get<CourseDescription[]>(`${API_URL}/courseDetails/courseDescription/All`);
  }
  saveCourseDescription(courseDescription: CourseDescription) {
    return this.http.post<CourseDescription>(`${API_URL}/courseDetails/saveCourseDescription`, courseDescription)
  }
  uploadImage(uploadImageData: FormData) {
    return this.http.post<Number>(`${API_URL}/image/upload`, uploadImageData)
  }
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

  getAllActiveCourse(courseType: string) {
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
