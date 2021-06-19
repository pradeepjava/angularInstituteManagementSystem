import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http'
@Component({
  selector: 'app-coursedescription',
  templateUrl: './coursedescription.component.html',
  styleUrls: ['./coursedescription.component.css']
})
export class CoursedescriptionComponent implements OnInit {
  selectedFile: File=new File([],'');
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string='';
  imageName: any;
  imgId:number=0;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:9090/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );


  }

    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:9090/image/get/' + this.imgId)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picbyte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
        error=>{
          console.log(error)
        }
      );
  }
}


