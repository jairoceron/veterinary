import { Component } from '@angular/core';
import { PacienteService } from '../service/paciente.service';
import { MatIconModule } from '@angular/material/icon';

import { MatTableDataSource } from '@angular/material/table';
import { ItemsX, proMascota } from '../veterinaria.interface';

@Component({
  selector: 'app-tabdue',
  templateUrl: './tabdue.component.html',
  styleUrl: './tabdue.component.css'
})
export class TabdueComponent {

  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  // dataSource = new MatTableDataSource<proMascota>([]);
  dataSource = new MatTableDataSource<ItemsX>([]);

  // displayedColumns = ['position', 'name', 'weight', 'symbol','test','test1','test2','test3','test4','test5','test6','test7','test8'];

  displayedColumns = ['idPersonaDueno', 'identificacion', 'nombres', 'apellidos', 'correoelectronico', 'telefono', 'ciudad', 'localidad', 'direccion',  'idVeterinario'];

  //dataX : proMascota[	] = [];
  //dataX_00 : proMascota.Items 
  dataX00: proMascota = { Items: [] };



  constructor(
    private pacienteservice: PacienteService,

  ) {


  }


  listaPropietarios() {

    // 9999999999

    // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);


    let idVeterinaria: string = this.pacienteservice.getIdVeterinaria();
    // this.pacienteservice.listaPropietariosX(idVeterinaria).subscribe(x => {
     // x;
     // console.log('que es esto?? ', x);
      // this.dataX00 = x;

      //  this.dataSource = new MatTableDataSource<proMascota>(x );
    // })





    /*
            this.pacienteservice.listaMascotas().subscribe(x => {
              x;
              console.log('xxxxxxxx ', x);
            })
              */

    this.pacienteservice.listaPropietariosX0(idVeterinaria).subscribe(x => {
      //x;
      console.log('  aprendiendo a pensar !!!!  ', x.Items);
      // this.dataX00 = x;

      this.dataSource = new MatTableDataSource<ItemsX>(x.Items);

      // this.dataSource = new MatTableDataSource<proMascota>(x );
    })


  }

  eliminarDuenoMascota(idP : string) {
    console.log( " eliminar dueno mascota ....  " , idP );

    this.pacienteservice.eliminarPropMascota(idP).subscribe(x => {
      x;
      console.log('eliminado el registro  ?? ', x);      
    })
  }
}

