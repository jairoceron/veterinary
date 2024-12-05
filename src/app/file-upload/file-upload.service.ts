import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { encode } from 'base64-arraybuffer';



@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // API url 
  // baseApiUrl = "https://file.io"
  baseApiUrl = "https://lpavmkwrvc.execute-api.us-east-2.amazonaws.com/dev/upload"
  baseApiUrl100 = "https://gsodcefc22.execute-api.us-east-2.amazonaws.com/dev/uploadJpeg"
  baseApiUrl200 = "https://lflrixfged.execute-api.us-east-2.amazonaws.com/dev/bucketsagevinok/"

  // https://gsodcefc22.execute-api.us-east-2.amazonaws.com/dev/uploadJpeg   

  // curl -X POST https://lpavmkwrvc.execute-api.us-east-2.amazonaws.com/dev/upload -H "Content-Type: application/json" --data-binary "marlenXX.pdf"
  // curl -X POST https://aaaaaaa.execute-api.us-west-2.amazonaws.com/beta/apitest/xml -H "Content-Type: application/json" --data-binary "Articletext"

  // curl --location 'https://lpavmkwrvc.execute-api.us-east-2.amazonaws.com/dev/upload'  --header 'Content-Type: application/pdf'  --data '@/C:/trabajo/Jairo_ceron_00.pdf'


  constructor(private http: HttpClient) { }

  // Returns an observable 
  upload(file: any): Observable<any> {

    let header = new HttpHeaders();
    // const headers = { "Content-Type":'text/plain' };
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
    //   header.append("Access-Control-Max-Age", "86400");

    // Access-Control-Allow-Headers: 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'

    // Access-Control-Allow-Methods: '*'

    // Access-Control-Allow-Origin: '*'


    // Create form data 
    const formData = new FormData();

    // Store form name as "file" with file data 

    formData.append('data', JSON.stringify({
      name: 'doc_name',
      description: 'doc_description'
    })
    );
    formData.append("file", file, file.name);


    // { headers: header }

    // Make http post request over api 
    // with formData as req 
    // return this.http.post(this.baseApiUrl, formData) 
    // return this.http.post(this.baseApiUrl, file) 


    // const headers_x = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body_x = 'title=Dancing Beers&band=Evils Ypsley';
    //let res_x$ = this.http.post<any>(this.baseApiUrl, body_x, { headers: headers_x });
    //console.log('gdmptlb ...', res_x$);
    //return this.http.post<any>(this.baseApiUrl, file, { headers: headers_x });

    // JSON.parse(file);

    // toca experimentar otra cosa es enviar un post pero de un texto, para ver si me da luces
    // console.log('toca experimentar otra cosa, es enviar un post ...', res_x$);
    // JSON.stringify(formData)

    console.log("header funciona _______", header);
    return this.http.post(this.baseApiUrl, file, { headers: header })
    // return this.http.post(this.baseApiUrl,formData, { headers: header }) 

  }

  upload100(file: any, nameFile:string): Observable<any> {

    console.log('____servicio ::: ')
    let header = new HttpHeaders();
   
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Access-Control-Allow-Methods", "PUT, OPTIONS, GET, POST, PATCH, DELETE");
    header.append('Access-Control-Allow-Credentials', '*');
    header.append("Access-Control-Allow-Headers", "*");
   

    //header.append('Content-Type', 'image/jpeg');
    header.append('Content-Type', 'application/json');
    // header.append('Accept', 'application/json');

   
    console.log("header funciona _______2014 gggg ", header);
    console.log("header funciona _______... file ", file);
    

    const formData = new FormData();
    formData.append("file", file, file.name);

    let url = this.baseApiUrl200 + nameFile + ".jpeg"

    console.log("header XXXX __... this.baseApiUrl200 ", url);

    return this.http.put(url, file, { headers: header })


  }





  getBase64EncodedFileData(file: File): Observable<string> {
    return new Observable(observer => {
      const reader = new FileReader();

      reader.onload = () => {
        const { result } = reader;
        const data = result as ArrayBuffer; // <--- FileReader gives us the ArrayBuffer
        const base64Encoded = encode(data); // <--- convert ArrayBuffer to base64 string

        observer.next(base64Encoded);
        observer.complete();
      };

      reader.onerror = () => {
        observer.error(reader.error);
      };

      reader.readAsArrayBuffer(file);
    });
  }





} 