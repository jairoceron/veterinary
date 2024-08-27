import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../service/paciente.service';
import { IDynamoPersonaDueno00, IItemDynamo, IMascota, Pqrs } from '../veterinaria.interface';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrl: './historia.component.css'
})
export class HistoriaComponent implements OnInit {




  // hagamos el primer post ::::
  nombreDueX: string = ''
  nombreDue: string = ''
  apellidoDue: string = ''
  identificacionDue: string = ''
  ciudadDue: string = ''
  localidadDue: string = ''
  direccionDue: string = ''
  telefono: string = ''
  correoelectronico: string = ''
  nombremascota : string = ''

  raza: string = ''



  constructor(
    private pacienteservice: PacienteService,

  ) {


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



  zzxPaciente() {

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



    let itemDynamoDB: IItemDynamo = {
      'idIDynamoPersonaDueno': {
        'idPersonaDueno': {
          'S': 'xxx_01'
        },
        'apellidos': {
          'S': this.nombreDue
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
        'S': this.nombreDue
      },
      'nombres': {
        'S': this.apellidoDue
      },
      'identificacion': {
        'S': this.identificacionDue
      },
      'ciudad': {
        'S': this.ciudadDue
      },
      'localidad': {
        'S': this.localidadDue
      },
      'direccion': {
        'S': this.direccionDue
      },
      'telefono': {
        'S': this.telefono
      },
      'correoelectronico': {
        'S': this.correoelectronico
      }


    }

    console.log("Datos Del Formulario ::::  ", iDynamoPersonaDueno00);

    console.log("this.nombreDue ::::  ", this.nombreDue);
    console.log("this.nombreDue ::::  ", this.nombreDueX);



    this.pacienteservice.updateRadicado(iDynamoPersonaDueno00).subscribe(x => {
      x;
      console.log('xxxxxxxx ', x);
    })




    //kk 
    //  this.pacienteservice.updateRadicado(kk).subscribe(x => {
    //    x;
    //    console.log('xxxxxxxx ', x);
    //  })

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
