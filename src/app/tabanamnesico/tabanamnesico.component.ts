import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IAnamnesicoGen, IMascotaGen, ItemsPersonaDueno, proMascota } from '../veterinaria.interface';
import { PacienteService } from '../service/paciente.service';
import { OCULTAR, VISUALIZAR } from '../service/constants';
import { MascotaService } from '../service/mascota.service';

@Component({
  selector: 'app-tabanamnesico',
  templateUrl: './tabanamnesico.component.html',
  styleUrl: './tabanamnesico.component.css'
})
export class TabanamnesicoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  pageNumber: any;

  dataSource = new MatTableDataSource<IAnamnesicoGen>([]);
  idVetMascota: string = '';
  idVeterinaria: string = '';


  displayedColumns = ['alimentacion', 'enfermedAnterior', 'evaluacion', 'fechaDesparacitacion', 'fechaUltParto', 'fechaVacuna', 'historiaReproductiva'];
  dataX00: proMascota = { Items: [] };



  constructor(
    private pacienteservice: PacienteService,
    private mascotaService: MascotaService
  ) {


    this.actualizarDataSource();

    this.mascotaService.datSourcdtSourAnamnesObservable.subscribe( x => {
      this.dataSource = x;
    })

   
  }
  ngOnInit() {
   // this.actualizarDataSource();
   // this.dataSource.paginator = this.paginator;
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

      //   this.pacienteservice.updateItemPersoDueno(itemPersonaDueno);


      //   this.pacienteservice.editformPropMascota(VISUALIZAR);  // para activar el formulario de data owner pet 


    })
  }


  actualizarDataSource() {



    let idVeterinaria: string = this.pacienteservice.getIdVeterinaria();
    this.pacienteservice.updateBehaDatSourcItemPerDueno(idVeterinaria);


    this.pacienteservice.datSourcItemPerDuenoObservable.subscribe(x => {
      this.mascotaService.idVetMascotaObserv.subscribe(
        x => {
          this.idVetMascota = x;
          let imageGen: IMascotaGen = {
          
            idVetMascota: this.idVetMascota,
            image: '',
            nombreMascota: '',
            especie: '',
            sexo: '',
            raza: '',
            color: '',
            fechaNacimiento: '',
            peso: '',
            idVeterinaria: this.idVeterinaria,
            idPersonaDueno: '',
            nombreTabla: 'vet_anamnesico',
            nombreDueno:'',
            cedulaDueno:''
          }
          this.mascotaService.vetQueryMascAnamnesico(imageGen).subscribe(
            x => {
              console.log(' este es el anamnesico ::::::: ', x)
              this.dataSource = new MatTableDataSource(x);
              console.log('si entra a esto ::::: ');
              //   this.dataSource.paginator = this.paginator;
            }
          )

        }



      );
    }
    );

  }

}

