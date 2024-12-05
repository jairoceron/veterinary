

import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PacienteService } from '../service/paciente.service';
import { IMascotaGen, proMascota } from '../veterinaria.interface';


export interface DialogData {
  animal: string;
  name: string;
  idMascota: string;
  imageGen: IMascotaGen;
  nameJpeg: string;
}


@Component({
  selector: 'app-dialog-mascota',
  templateUrl: './dialog-mascota.component.html',
  styleUrl: './dialog-mascota.component.css'
})
export class DialogMascotaComponent {
  readonly dialogRef = inject(MatDialogRef<DialogMascotaComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);
  readonly idMascota = model(this.data.idMascota);
  readonly imageGenX = model(this.data.imageGen);
  readonly nameJpeg = this.data.nameJpeg;

 

 // nameJpeg = '9914004';
 // imageUrl = "https://mnpb2lomnh.execute-api.us-east-2.amazonaws.com/v1/bucketsagevinok?file=" + this.nameJpeg + ".jpeg";


 imageUrl = "https://mnpb2lomnh.execute-api.us-east-2.amazonaws.com/v1/bucketsagevinok?file=" + this.nameJpeg + ".jpeg"; // ;

 // https://mnpb2lomnh.execute-api.us-east-2.amazonaws.com/v1/bucketsagevinok?file=6250256.jpeg

  idMascotaX = this.data.idMascota;

  imageGen: IMascotaGen = {
  
    'idVetMascota': '',
    'image': '',
    'nombreMascota': '',
    'especie': '',
    'sexo': '',
    'raza': '',
    'color': '',
    'fechaNacimiento': '',
    'peso': '',
    'idVeterinaria': '',
    'idPersonaDueno': '',
     'nombreDueno':'',
            'cedulaDueno':''
  }

  imagenGen = this.data.imageGen;




  onNoClick(): void {
    this.dialogRef.close();
  }

  /*
  constructor(private pacienteService: PacienteService) {

    
    console.log('data ___ ', this.data)


    console.log("__idMascota __", this.idMascota);
    // console.log("__  llll __", this.llll  )
    this.imagenGen = this.data.imageGen;
    this.listadoDeImagenes();
    

    console.log("__this.data.imageGen __  ", this.data.imageGen);

    
  }*/

    /*
  listadoDeImagenes() {
    let idVeterinaria = this.pacienteService.idVeterinaria;
    console.log('listaDE_imagenes ---- this.idMascotaX ', this.idMascotaX);
    console.log('listaDE_imagenes ---- idVeterinaria   ', idVeterinaria );
    this.pacienteService.listaImagesXMascota(idVeterinaria, this.idMascotaX).subscribe(

      x => {
        x;
        console.log('resultado de la lista de mascotas::: ' , x);
        //this.nameJpeg = '9914004';

        let mascota: proMascota = x;
        if (mascota.Items.length > 0) {
          let image = mascota.Items[0].image
          this.imageUrl = "https://mnpb2lomnh.execute-api.us-east-2.amazonaws.com/v1/bucketsagevinok?file=" + image;
          console.log(" subscribe ... ", this.imageUrl);
        } else {
               console.log('No hay ningún listado de imagenes :::: ')
        }
        //*******
      }

    );
    
    //**********

  }*/

}
