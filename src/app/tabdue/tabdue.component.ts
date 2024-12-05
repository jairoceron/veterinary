import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from '../service/paciente.service';
import { MatIconModule } from '@angular/material/icon';

import { MatTableDataSource } from '@angular/material/table';
import { ItemsPersonaDueno, proMascota } from '../veterinaria.interface';
import { OCULTAR, VISUALIZAR } from '../service/constants';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tabdue',
  templateUrl: './tabdue.component.html',
  styleUrl: './tabdue.component.css'
})
export class TabdueComponent  implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator  | null = null;

  pageNumber: any;
 
  dataSource = new MatTableDataSource<ItemsPersonaDueno>([]);


  displayedColumns = ['idPersonaDueno', 'nombres', 'apellidos', 'correoelectronico', 'telefono', 'ciudad', 'localidad'];
  dataX00: proMascota = { Items: [] };



  constructor(
    private pacienteservice: PacienteService,

  ) {
   

    this.pacienteservice.datSourcItemPerDuenoObservable.subscribe(x => {
      this.dataSource = x;
      console.log('si entra a esto ::::: ');
      this.dataSource.paginator = this.paginator;
    }
    );

    // this.listaPropietarios()
   // this.dataSource.paginator = this.paginator;

  }
  ngOnInit() {
    this.actualizarDataSource();
    this.dataSource.paginator = this.paginator;
  }

  listaPropietarios() {

    //let idVeterinaria: string = this.pacienteservice.getIdVeterinaria();
   // this.actualizarDataSource();
  }

  eliminarDuenoMascota(idP: string) {
    console.log(" eliminar dueno mascota ....  ", idP);

    this.pacienteservice.eliminarPropMascota(idP).subscribe(x => {
      x;
      console.log('eliminado el registro  ?? ', x);

    })

    this.actualizarDataSource();

  }


  listMascotaPorPropietar(idPropietario: string) {


    this.pacienteservice.updateIdPersonaDueno(Number(idPropietario));

    this.pacienteservice.setIdPersonaDueno(idPropietario)
    this.pacienteservice.editformPropMascota(OCULTAR);
    this.pacienteservice.editFormMascocta(VISUALIZAR);
    this.pacienteservice.editFormTablaMasc(VISUALIZAR);
  

    let idVeterinaria = this.pacienteservice.getIdVeterinaria();


    this.pacienteservice.updateDatSourc(idVeterinaria, idPropietario);

  }

  editDataFormPropMascota(idP: string) {

    this.pacienteservice.editDataFormPropMascota(idP).subscribe(x => {
      x;
      let dataX010: proMascota = x;

      let itemPersonaDueno: ItemsPersonaDueno = {

        identificacion: dataX010.Items[0].identificacion,
        nombres: dataX010.Items[0].nombres,
        apellidos: dataX010.Items[0].apellidos,
        ciudad: dataX010.Items[0].ciudad,
        localidad: dataX010.Items[0].localidad,
        direccion: dataX010.Items[0].direccion,
        idPersonaDueno: dataX010.Items[0].idPersonaDueno,
        idVeterinario: dataX010.Items[0].idVeterinario,
        telefono: dataX010.Items[0].telefono,
        correoelectronico: dataX010.Items[0].correoelectronico,
        image: ''

      }

      this.pacienteservice.updateItemPersoDueno(itemPersonaDueno);


      this.pacienteservice.editformPropMascota(VISUALIZAR);  // para activar el formulario de data owner pet 


    })
  }


  actualizarDataSource() {



    let idVeterinaria: string = this.pacienteservice.getIdVeterinaria();
    this.pacienteservice.updateBehaDatSourcItemPerDueno(idVeterinaria);


    this.pacienteservice.datSourcItemPerDuenoObservable.subscribe(x => {
      this.dataSource = x;
      this.dataSource.paginator = this.paginator;
    }
    );

  }

}

