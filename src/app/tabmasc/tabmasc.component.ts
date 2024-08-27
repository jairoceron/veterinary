import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsMascotaX, ItemsX, listMascota, proMascota } from '../veterinaria.interface';
import { PacienteService } from '../service/paciente.service';

@Component({
  selector: 'app-tabmasc',
  templateUrl: './tabmasc.component.html',
  styleUrl: './tabmasc.component.css'
})
export class TabmascComponent {

  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  // dataSource = new MatTableDataSource<proMascota>([]);
  
  dataSource = new MatTableDataSource<ItemsMascotaX>([]);

  // displayedColumns = ['position', 'name', 'weight', 'symbol','test','test1','test2','test3','test4','test5','test6','test7','test8'];




  displayedColumns = ['idPersonaDueno', 'idVetMascota', 'nombreMascota', 'raza'];

  //dataX : proMascota[	] = [];
  //dataX_00 : proMascota.Items 
  dataX00: proMascota = { Items: [] };



  constructor(
    private pacienteservice: PacienteService,

  ) {


  }


  listPet() {

    let listMascota : listMascota = {Items:[]};

    let idVeterinaria: string = this.pacienteservice.getIdVeterinaria();
    this.pacienteservice.listaMascotass(idVeterinaria).subscribe(x => {
      listMascota = x;
   //   console.log('  listado de mascotas !!!!  ',listMascota) ;
      console.log('  listado de mascotas !!!!  ',listMascota.Items) ;


      this.dataSource = new MatTableDataSource<ItemsMascotaX>(listMascota.Items);
//*******************
      
    })


  }

  eliminarDuenoMascota(idP: string) {
    console.log(" eliminar dueno mascota ....  ", idP);

    this.pacienteservice.eliminarPropMascota(idP).subscribe(x => {
      x;
      console.log('eliminado el registro  ?? ', x);
    })
  }
}

