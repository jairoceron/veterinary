import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../service/paciente.service';
import { IDuenoMascota, IDynamoPersonaDueno00, IItemDynamo, IMascota, ItemsPersonaDueno, Pqrs } from '../veterinaria.interface';
import { DialogconfComponent } from '../dialogconf/dialogconf.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VISUALIZAR } from '../service/constants';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrl: './historia.component.css'
})
export class HistoriaComponent implements OnInit {


  itemsPersonaDueno: ItemsPersonaDueno = {

    identificacion: '',
    nombres: '',
    apellidos: '',
    ciudad: '',
    localidad: '',
    direccion: '',
    idPersonaDueno: '',
    idVeterinario: '',
    telefono: '',
    correoelectronico: '',
    image: ''
  }

  // hagamos el primer post ::::
  // nombreDueX: string = ''
  // nombreDue: string = ''
  // apellidoDue: string = ''
  // identificacionDue: string = ''
  // ciudadDue: string = ''
  // localidadDue: string = ''
  // direccionDue: string = ''
  // telefono: string = ''
  // correoelectronico: string = ''
  // nombremascota: string = ''
  buscarPropMascT: string = ''

  raza: string = ''
  formPropietaMascota: string = ''


  constructor(
    private pacienteservice: PacienteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) {
    this.pacienteservice.itemPersoDuenoObservable.subscribe(x => {
      console.log('llllllllllllllllll .... ', x);
      x;
      this.itemsPersonaDueno = {

        identificacion: x.identificacion,
        nombres: x.nombres,
        apellidos: x.apellidos,
        ciudad: x.ciudad,
        localidad: x.localidad,
        direccion: x.direccion,
        idPersonaDueno: x.idPersonaDueno,
        idVeterinario: x.idVeterinario,
        telefono: x.telefono,
        correoelectronico: x.correoelectronico,
        image: ''

      }

    })

  }

  ngOnInit() {
    // ...
  }

  guardaPaciente() {
    this.pacienteservice.listaMascotas().subscribe(x => {
      x;
      console.log('xxxxxxxx ', x);
    })
  }


  xPaciente() {
    this.pacienteservice.searchHeroes('gdmptlb').subscribe(x => {
      x;
      console.log('xxxxxxxx ', x);
    })
  }




  /**
   *  {
              'idPersonaDueno' : {
                  'S':'005'
              },
              'nombres': {
                  'S':'MARIA MAGDALENA'
              },
              'apellidos': {
                  'S':'NEVILLE'
              }
   * 
   */




  openDialog() {
    const dialogRef = this.dialog.open(DialogconfComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });
    const snack = this.snackBar.open('Datos del propietario de la mascota ... dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      console.log("este es el original ..... Confirmed ---- ", confirmed);
      if (confirmed) {


        this.guardadoX();  // el guardado se hace en la confirmación
        this.pacienteservice.editformPropMascota('ocultar');




        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open('Closing snack bar in a few seconds', 'Fechar', {
          duration: 2000,
        });
      }
    });
  }


  guardadoX() {

    let itemDynamoDB: IItemDynamo = {
      'idIDynamoPersonaDueno': {
        'idPersonaDueno': {
          'S': 'xxx_01'
        },
        'apellidos': {
          'S': this.itemsPersonaDueno.apellidos
        },
        'nombres': {
          'S': 'PABLO DE TARSO bbbbbbbbbbb'
        }
      },
      'iDynamoTableName': { 'tableName': 'personaDueno' }
    }

    let max = 10000000;

    let idPersona = Math.floor(Math.random() * max);

    let iDynamoPersonaDueno00: IDynamoPersonaDueno00 = {
      'idPersonaDueno': {
        'S': idPersona.toString()
      }, 'idVeterinario': {
        'S': this.pacienteservice.getIdVeterinaria()
      },


      'apellidos': {
        'S': this.itemsPersonaDueno.apellidos
      },
      'nombres': {
        'S': this.itemsPersonaDueno.nombres
      },
      'identificacion': {
        'S': this.itemsPersonaDueno.identificacion
      },
      'ciudad': {
        'S': this.itemsPersonaDueno.ciudad
      },
      'localidad': {
        'S': this.itemsPersonaDueno.localidad
      },
      'direccion': {
        'S': this.itemsPersonaDueno.direccion
      },
      'telefono': {
        'S': this.itemsPersonaDueno.telefono
      },
      'correoelectronico': {
        'S': this.itemsPersonaDueno.correoelectronico
      }


    }

    console.log("Datos Del Formulario ::::  ", iDynamoPersonaDueno00);

    //  console.log("this.nombreDue ::::  ", this.nombreDue);
    //  console.log("this.nombreDue ::::  ", this.nombreDueX);



    this.pacienteservice.updateRadicado(iDynamoPersonaDueno00).subscribe(x => {
      x;
      console.log('xxxxxxxx ', x);
      let idVeterinaria: string = this.pacienteservice.getIdVeterinaria();
      // ddddd
  
      this.pacienteservice.updateBehaDatSourcItemPerDueno(idVeterinaria);
      console.log('actualizacion de visualizacion tabla de dueños ')
      this.pacienteservice.editFormTablaDuenos(VISUALIZAR);
    })




    //kk 
    //  this.pacienteservice.updateRadicado(kk).subscribe(x => {
    //    x;
    //    console.log('xxxxxxxx ', x);
    //  })

  }


  zzxPaciente() {
    this.openDialog();
   

    // <div *ngIf="formTablaDuenos === VISUALIZAR   ">
    // <app-tabdue></app-tabdue>
   // </div>
//fff
    /*
    this.pacienteservice.listaPropietariosX0(idVeterinaria).subscribe(
        x => {
          x;
          console.log('arreglo ... del datasource');
        }

    ) */


    /*
    let pqrs: Pqrs = {
      objectid: 5,
      radicado: 'xxx01',
      asunto_radicacion: 'xxx02',
      razon_social_establecimiento: 'xxx03',
      sector_reportado: 'xxx04',
      localidad: 'xxx05',
      entidad_de_control: 'xxx05'
    };
*/
    /*
    this.pacienteservice.updateRadicado(pqrs).subscribe(x => {
      x;
      console.log('xxxxxxxx ', x);
    })
    */
  }


  myFunction() {
    console.log('guardado de la ....... ');
  }

  ssss() {

    console.log('ffguardado de la ....... ');
  }


  /*
     this.etService.loadEvaEtiquetadoConParametro(this.informacionVehx).subscribe( 
      x => {
  
        x;
        this.dataSource = new MatTableDataSource(x);
        this.etService.actualizarDataSouEvaEtique(this.dataSource);
  
      this.dataSource.paginator = this.paginator;
      }
  
    )
  })
  */





}
