import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN, API_URL } from '../constentProvider';

export class CourseDetails {
  constructor(public courseId: number,
    public courseName: string,
    public courseFee: number,
    public status: string,
    public approveStatus: string
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})

export class CourseserviceService {
  constructor(private http: HttpClient) { }

  saveCourseInDB(courseName: string, courseFee: number, status: string) {
    let headers:HttpHeaders=new HttpHeaders();
    let token = localStorage.getItem(TOKEN);
    if (token) {
       headers = new HttpHeaders({
        Authorization: token
      })
    }
     return this.http.post<CourseDetails>(`${API_URL}/courseDetails/saveCourse`, { courseName, courseFee, status }, { headers: headers })
  }
}
