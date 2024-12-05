import { Component, inject, model, OnInit, signal } from '@angular/core';
import { PacienteService } from '../service/paciente.service';
import { IImagen, IMascotaGen, IMascota, IEspecie, IRazasGen } from '../veterinaria.interface';

import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { AsyncSubject, catchError, map, Observable, throwError } from 'rxjs';
import { FileUploadService } from '../file-upload/file-upload.service';
import { DialogMascotaComponent } from '../dialog-mascota/dialog-mascota.component';
import { MatDialog } from '@angular/material/dialog';
import { MascotaService } from '../service/mascota.service';
import { IMASCOTAGENCONST, IESPECIESCONST, IMAGE_JPEG, ENABLED, DISABLED, OCULTAR, VISUALIZAR } from '../service/constants';

export interface SelectedFiles {
  name: string;
  file: any;
  base64?: string;
}

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css'
})
export class MascotaComponent implements OnInit {

  readonly iEspecie = IESPECIESCONST
  readonly enabled = ENABLED
  readonly disabled = DISABLED
  readonly image_jpeg = IMAGE_JPEG

  mascotaConImagen = DISABLED

  iRaza: IRazasGen[] = []
  especie: IEspecie = { idEspecie: '', name: '' }
  raza: IRazasGen = {
    idRaza: '',
    especie: '',
    nombre: ''
  }

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  max = 10000000;

  imageGen: IMascotaGen = IMASCOTAGENCONST;
  nameJpeg: string = '';

  progress: number = 0;
  imageUrl = "https://mnpb2lomnh.execute-api.us-east-2.amazonaws.com/v1/bucketsagevinok?file=9983779.jpeg"


  guardaInfoMascota() {

    this.imageGen.idVeterinaria = this.pacienteservice.getIdVeterinaria();
    let idPersona: number = Math.floor(Math.random() * this.max);  /* es aqui está generando un numero aleatorio * */

    this.pacienteservice.idPersonaDuenoObservable.subscribe(x => {
      idPersona = x;
    });


    let idMascota = Math.floor(Math.random() * this.max);
    if (this.imageGen.idVetMascota != '') {
      idMascota = Number(this.imageGen.idVetMascota)
    }


    // let idImagen = Math.floor(Math.random() * this.max);
    // this.nameJpeg = Math.floor(Math.random() * max).toString();

    /// idVetMascota

    let nombreMascota = this.imageGen.nombreMascota;
    nombreMascota = nombreMascota.toUpperCase();

    let iMascota: IMascota = {
      'idPersonaDueno': {
        'S': idPersona.toString()
      }, 'idVetMascota': {
        'S': idMascota.toString()
      }, 'nombreMascota': {
        'S': nombreMascota
      }, 'raza': {
        'S': this.imageGen.raza
      }, 'idVeterinaria': {
        'S': this.imageGen.idVeterinaria
      }, 'sexo': {
        'S': this.imageGen.sexo
      }, 'especie': {
        'S': this.imageGen.especie
      }, 'color': {
        'S': this.imageGen.color
      }, 'peso': {
        'S': this.imageGen.peso
      }, 'fechaNacimiento': {
        'S': this.imageGen.fechaNacimiento
      }, 'nombreDueno': {
        'S': this.imageGen.nombreDueno
      }, 'cedulaDueno': {
        'S': this.imageGen.cedulaDueno
      }

    }




    this.pacienteservice.guardaMascota(iMascota).subscribe(x => {
      x;

      let idPersonaDueno = this.pacienteservice.getIdPersonaDueno();
      let idVeterinaria = this.pacienteservice.getIdVeterinaria();
      // esto actualiza el datasource ....
      // de la lista de mascotas por personaDueno y por veterinaria


      this.pacienteservice.updateDatSourc(idVeterinaria.toString(), idPersonaDueno.toString());
    });
    // aaaaaaaaaaaaaaaaaa

    this.mascotaService.updateBehavSub_Mascota(this.imageGen);
    this.pacienteservice.nombreImagenObservable.subscribe(x => {

      this.mascotaConImagen = ENABLED
      console.log('este es el valor clave :::: ', x)
      if (x != IMAGE_JPEG) { // esto es para asegurar que si se carga una imagen. 

        this.nameJpeg = x;

        this.mascotaConImagen = DISABLED


        // 333333ggggg 
        let iImage: IImagen = {
          'idVetMascota': {
            'S': idMascota.toString()
          }, 'image': {
            'S': this.nameJpeg + '.jpeg'
          }, 'order': {
            'S': '002'
          }
        }



        //comentado 20/10/2024 cumpliendo el principio de atomicidad .....
        this.pacienteservice.guardaImagenTablaDynamo(iImage).subscribe(x => {

          x;

          // this.imageUrl = "https://mnpb2lomnh.execute-api.us-east-2.amazonaws.com/v1/bucketsagevinok?file=" + this.nameJpeg + ".jpeg";




        })

      }




    })


    // en el dialogo Modal, es solo visualización.
    /*
    const dialogRef = this.dialog.open(DialogMascotaComponent, {
      data: { name: this.name(), animal: this.animal(), idMascota: idMascota, imageGen: this.imageGen, nameJpeg: this.nameJpeg },
    });



    dialogRef.afterClosed().subscribe(result => {
  
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
*/

    this.pacienteservice.ocultarPartes();
    // aaa
    this.pacienteservice.editFormAnamnesico(VISUALIZAR);

  }

  //version = VERSION;
  base64File: string = '';
  filename: string = '';

  onFileSelect(e: any): void {
    try {
      const file = e.target.files[0];
      const fReader = new FileReader()
      fReader.readAsDataURL(file)
      fReader.onloadend = (_event: any) => {
        this.filename = file.name;
        this.base64File = _event.target.result;
      }
    } catch (error) {
      this.filename = '';
      this.base64File = '';

    }
  }



  shortLink: string = ''; // Variable to store shortLink from api response
  loading: boolean = false; // Flag variable
  //  file: File | null = null; // Variable to store file to Upload

  // Inject service
  constructor(private fileUploadService: FileUploadService,

    private pacienteservice: PacienteService,
    private mascotaService: MascotaService,
    private http: HttpClient
  ) {


    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx inicia');
    let lineX: string[] = ['', '', '', '', ''];
    for (let j = 0; j < lineX.length; j++) {
      console.log('X___X');
    }

    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx inicia');

    let myArray1: number[] = [1, 2, 1, 3, 3, 1, 2, 1, 5, 1];
    let number: number[] = [1, 2, 3, 4, 5];
    let line: string[] = ['', '', '', '', ''];

    for (let j = 0; j < number.length; j++) {
      //  console.log(" ", j);

      for (let i = 0; i < myArray1.length; i++) {
        if (number[j] === myArray1[i]) {
          line[j] = line[j] + 'x'
          //       console.log ( 'x' );
        }
      }
    }

    for (let k = 0; k < line.length; k++) {
      console.log(number[k], ' ', line[k]);
    }
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx termina ');


    // esto es para las operaciones de update .....
    this.mascotaService.mascotaGenObserv.subscribe(
      x => {
        this.imageGen = x;
        console.log("  el xxx  ", x);
        this.mascotaService.imagesXMascota(x.idVeterinaria, x.idVetMascota).subscribe(x => {
          this.imageUrl = "https://mnpb2lomnh.execute-api.us-east-2.amazonaws.com/v1/bucketsagevinok?file=" + x.image;
          console.log(' esta es la imagen ...  ', this.imageUrl);





        })
      }
    );

    // imagesXMascota(idVeterinaria: string, idMascota: string): Observable<VetImages> {

  }




  ngOnInit(): void {

    let imageGen: IMascotaGen = IMASCOTAGENCONST;
    imageGen.nombreTabla = 'vet_raza';
    imageGen.especie = 'Perrito';

    // this.mascotaService.razasPorEspecie(imageGen).subscribe(x => {
    //   console.log('razas de Perritosddd1rr:112r::: ----111 1111 ', x);
    // })
  }


  files: FileList | null = null;

  upload(file: any) {
    this.progress = 1;
    const formData = new FormData();
    formData.append("file", file);

    this.http.put("https://5axqqfxrq2.execute-api.us-east-2.amazonaws.com/dev/bucketsagevinok/s3_perrito_00.jpg", formData, {
      reportProgress: true,
      observe: "events"
    })
      .pipe(
        map((event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.progress = Math.round((100 / event.total) * event.loaded);
          } else if (event.type == HttpEventType.Response) {
            this.progress = 0;
          }
        }),
        catchError((err: any) => {
          this.progress = 0;
          alert(err.message);
          return throwError(err.message);
        })
      )
      .toPromise();
  }




  public selectedFiles: SelectedFiles[] = [];

  onFileChange(files: any) {
    //for (let index = 0; index ) { 

    let fileXX = files.target.files[0];

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Requested-With',
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    var url = "https://5axqqfxrq2.execute-api.us-east-2.amazonaws.com/dev/bucketsagevinok/recurso.pdf"

    // base64Image
    // this.http.put(url, files.target.files[0]).subscribe({


    this.http.put(url, fileXX, { headers: headers }).subscribe({
      next: data => {

        console.log(".....   video uploaded successfully");
      },
      error: error => {
        console.error('There was an error!', error)
      }
    });



    //   this.uploadFile(files.files[0]);  
    //};  
  }

  uploadFile(file: any) {
    var params = { Bucket: 'mycloudbox1', Key: 'this.userid' + '/videos/' + file.data.name, Expires: 3600, ContentType: file.data.type };
    // var url=this.bucket.getSignedUrl('putObject',params);


    file.target.files[0];

  }

  onChange2015(event: any) {
    this.file = event.target.files[0];
    let file = event.target.files[0];


    let url = 'https://lpavmkwrvc.execute-api.us-east-2.amazonaws.com/dev/upload';
    //https://ljy7tvsqf4.execute-api.us-east-2.amazonaws.com/dev

    // let url = 'https://n5sd8zal27.execute-api.us-west-2.amazonaws.com/dev/upload';
    let formData = new FormData();
    // formData.append("marlen.pdf", file,"marlen.pdf");
    formData.append("marlen.pdf", file);


    let header = new HttpHeaders();
    // const headers = { "Content-Type":'text/plain' };
    header.set('Access-Control-Allow-Origin', '*');
    header.append('Content-Type', 'application/json');   // 'multipart/form-data'
    header.append('Accept', 'application/json');

    // : 
    // Content-Type : application/json
    // Accept : application/json
    // 'Content-Type','text/plain'
    //header.append('accept', 'application/json');
    header.append("Access-Control-Allow-Origin", "*");
    header.append("Access-Control-Expose-Headers", "Content-Disposition");
    header.append("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT,OPTIONS");
    header.append("Access-Control-Allow-Headers", "*");
    header.append("Access-Control-Max-Age", "86400");
    // 'Content-Type': 'multipart/form-data'   // 'application/json;charset=UTF-8'

    var config = {
      headers: { 'Content-Type': undefined },
      transformRequest: []
    };


    let type = file.type;
    let nameFile = file.name;
    let size = file.size;
    //  let reader = new FileReader();
    //  reader.readAsDataURL(file);



    //{headers: header}



    const formData1 = new FormData();
    formData1.append("file", file);
    //formData1.append("jsonData", JSON.stringify(sampleJson1));

    this.http.post(url, formData, { headers: header }).subscribe(
      (res) => {
        console.log('response', res)
      }
    )





  }


  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload 



  /*
    onUpload() {
      this.loading = !this.loading;
      //  let ss: File = this.file;
      //  this.fileUploadService.getBase64EncodedFileData(ss).subscribe(xFile => {
  
      //    xFile
  
  
     
      this.fileUploadService.upload(this.file).subscribe(
        (event: any) => {
          if (typeof (event) === 'object') {
  
            // Short link via api response 
            this.shortLink = event.link;
  
            this.loading = false; // Flag variable  
          }
        }
      );
  */
  //    }

  //)

  //}




  // Variable to store shortLink from api response 
  //   shortLink: string = ""; 
  //  loading: boolean = false; // Flag variable 
  //  file: File  = new File(["foo"]); // Variable to store file 



  file = new File(["foo"], "foo.txt", {
    type: "text/plain",
  });

  // Inject service  
  // On file Select 


  onChange99(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload 
  onUpload99() {
    this.loading = !this.loading;
    let ss: File = this.file;
    //  this.fileUploadService.getBase64EncodedFileData(ss).subscribe(xFile => {

    //    xFile



    this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          // Short link via api response 
          this.shortLink = event.link;

          this.loading = false; // Flag variable  
        }
      }
    );
  }
  // -----------------------------------------

  onChange100(event: any) {
    this.file = event.target.files[0];

  }

  // OnClick of button Upload 
  onUpload100() {
    this.loading = !this.loading;
    let fileX: File = this.file;

    this.nameJpeg = Math.floor(Math.random() * this.max).toString();
    //*****
    this.pacienteservice.setNombreImagen(this.nameJpeg);



    //  this.fileUploadService.getBase64EncodedFileData(ss).subscribe(xFile => {

    //    xFile



    this.fileUploadService.upload100(this.file, this.nameJpeg).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {


          this.imageUrl = "https://mnpb2lomnh.execute-api.us-east-2.amazonaws.com/v1/bucketsagevinok?file=" + this.nameJpeg + ".jpeg";


          // Short link via api response 
          // this.shortLink = event.link;

          //  this.loading = false; // Flag variable  
        }
      }
    );

  }

  seleccionaEspecie() {

    // if 

    let imageGen: IMascotaGen = IMASCOTAGENCONST;
    imageGen.nombreTabla = 'vet_raza';
    imageGen.especie = this.especie.name


    this.mascotaService.razasPorEspecie(imageGen).subscribe(x => {

      this.iRaza = [];
      let vectorRazas: IRazasGen[] = x;
      vectorRazas.forEach(x => {
        this.iRaza.push(x);
      }
      )
    })


  }



}


