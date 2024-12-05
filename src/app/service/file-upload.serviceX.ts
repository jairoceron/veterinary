import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceX {
  // API url
  //baseApiUrl = 'https://file.io';
  // baseApiUrl = 'https://889zfimxe2.execute-api.us-east-2.amazonaws.com/dev/bucketsagevinok/jairokkk.pdf';    // perrito_00.jpeg



  baseApiUrl = 'https://5axqqfxrq2.execute-api.us-east-2.amazonaws.com/dev/bucketsagevinok/s3_perrito_00.jpg';  //jvcb.pdf

  //https://5axqqfxrq2.execute-api.us-east-2.amazonaws.com/dev
  constructor(private http: HttpClient) { }

  // Returns an observable
  upload89(file: any): Observable<any> {
    // Create form data
   // const formData = new FormData();

    // Store form name as "file" with file data
   // console.log('file  xxxx  ', file)
   // console.log('file.name  eeexxxx  ', file.name)

    // const reader = new FileReader();
    //reader.readAsDataURL(file);


   // formData.append('file', file, file.name);
    // formData.append('file', file, file.name);

    // let headers = new HttpHeaders();
    /* headers = headers
       .set('Access-Control-Allow-Origin', "*")
       .set("Content-Type", "application/json")
       .set("Access-Control-Expose-Headers", "Content-Length");*/

    //   httpOptions = {
    //    headers: new HttpHeaders({
    //      'Content-Type': 'application/x-www-form-urlencoded'
    //    })
    //  };

    /*
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/x-www-form-urlencoded'
    };*/

    let header = new HttpHeaders();
    

    header.set('Access-Control-Allow-Origin', '*');
    // header.append('Content-Type', "multipart/form-data");   // 'multipart/form-data'
    header.append('Accept', 'application/json');
    // "Content-Type": 
    // : 
    // Content-Type : application/json
    // Accept : application/json
    // 'Content-Type','text/plain'
    //header.append('accept', 'application/json');
    header.append("Access-Control-Allow-Origin", "*");
    //  header.append("Access-Control-Expose-Headers", "Content-Disposition");
    header.append("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT,OPTIONS");
    header.append("Access-Control-Allow-Headers", "*");


    console.log('parte 1xx ');
    // this.http.put(this.baseApiUrl, formData).subscribe(
    //  this.http.put(this.baseApiUrl, this.base64Image,{ headers: headers }).subscribe(

    // (res) => {
    //   console.log('response', res)
    // }
    //)
    console.log('parte 2xx ');


    //'Access-Control-Allow-Origin', '*'
    // 'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT'      

    // Make http post request over api
    // with formData as req
    const body = { token: 'e7b5933f819fda64660ece7ff9cb3197' };

    // console.log(" zzzzzzz ", reader.readAsDataURL(file));

    const formData = new FormData();

    // Store form name as "file" with file data 

    formData.append('data', JSON.stringify({
      name: 'doc_name',
      description: 'doc_description'
    })
    );
    formData.append("file", file, file.name);

   // return this.http.put(this.baseApiUrl, formData, { headers: header });
    // return this.http.post(this.baseApiUrl, body,{headers:headers});

    return this.http.post(this.baseApiUrl, file, { headers: header })


  }

  ng000OnInit() {
    const body = { title: 'Angular PUT Request Example' };

    let baseApiUrl = 'https://5axqqfxrq2.execute-api.us-east-2.amazonaws.com/dev/bucketsagevinok/jvcb.pdf';  //jvcb.pdf
    let postId = '';


    this.http.put<any>(baseApiUrl, body)
      .subscribe(data => postId = data.id);
  }





}
