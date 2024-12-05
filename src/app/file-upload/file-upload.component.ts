import { Component, OnInit } from '@angular/core'; 
import { FileUploadService } from './file-upload.service';

  
@Component({ 
    selector: 'app-file-upload', 
    templateUrl: './file-upload.component.html', 
    styleUrls: ['./file-upload.component.css'] 
}) 
export class FileUploadComponent implements OnInit { 
  
    // Variable to store shortLink from api response 
    shortLink: string = ""; 
    loading: boolean = false; // Flag variable 
  //  file: File  = new File(["foo"]); // Variable to store file 

     file = new File(["foo"], "foo.txt", {
        type: "text/plain",
      });
  
    // Inject service  
    constructor(private fileUploadService: FileUploadService) { } 
  
    ngOnInit(): void { 
    } 
  
    // On file Select 
    onChange(event : any) { 
        this.file = event.target.files[0]; 
    } 
  
    // OnClick of button Upload 
    onUpload() { 
        this.loading = !this.loading; 
        let ss :  File  = this.file ;
      //  this.fileUploadService.getBase64EncodedFileData(ss).subscribe(xFile => {
            
        //    xFile
        

            console.log(this.file); 
        this.fileUploadService.upload(this.file).subscribe( 
            (event: any) => { 
                if (typeof (event) === 'object') { 
  
                    // Short link via api response 
                    this.shortLink = event.link; 
  
                    this.loading = false; // Flag variable  
                } 
            } 
        );
        
    //    }
    
    //)
         
    } 
}