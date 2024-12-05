import { Component } from '@angular/core';
import { AfiliadoService, VISUALIZAR } from '../service/afiliado.service';
import { IAfiliado } from './interfaz/nuevaEps';
import { FileUploadService } from '../file-upload/file-upload.service';
import { PacienteService } from '../service/paciente.service';
import { MascotaService } from '../service/mascota.service';
import { HttpClient } from '@angular/common/http';
import { IMASCOTAGENCONST } from '../service/constants';
import { IMascotaGen } from '../veterinaria.interface';

@Component({
  selector: 'app-afiliado',
  templateUrl: './afiliado.component.html',
  styleUrl: './afiliado.component.css'
})
export class AfiliadoComponent {

  regimenN: string = '';
  modalidadN: string = '';
  numeroN: string = '';
  shortLink: string = ''; // Variable to store shortLink from api response
  loading: boolean = false; // Flag variable
  max = 10000000;
  imageUrl :string = ''

  imageGen: IMascotaGen = IMASCOTAGENCONST;
  nameJpeg: string = '';

   constructor(private afiliadoService : AfiliadoService, private fileUploadService: FileUploadService,

    private pacienteservice: PacienteService,
    private mascotaService: MascotaService,
    private http: HttpClient) {
    
   }

   file = new File(["foo"], "foo.txt", {
    type: "text/plain",
  });

  onReset() {}

  guardar() {
    console.log('Guardar regimen ' , this.regimenN );
    console.log('Guardar modalidadN' , this.modalidadN );
    console.log('Guardar numeroN ' , this.numeroN);



    let jj = Math.floor(Math.random() * 100000000);
    

    let iAnamnesico: IAfiliado  = { 
      
        'idcontrato': {
            'S': jj.toString()
        }, 'modalidad': {
            'S': this.modalidadN
        }, 'regimen': {
            'S':  this.regimenN 
        }, 'numero': {
            'S': this.numeroN
        }, 'eps': {
            'S': 'nueva_eps'
        }
    
    }

    this.afiliadoService.guardaItemTablaDynamoAnamnesico(iAnamnesico).subscribe( x => {
      x;
      console.log(x);
      this.afiliadoService.edittabContrato(VISUALIZAR);
    }) 


  }
  onChange100(event: any) {
    this.file = event.target.files[0];

  }

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

}
