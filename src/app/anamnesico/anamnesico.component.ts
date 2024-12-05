import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../service/mascota.service';
import { PacienteService } from '../service/paciente.service';
import { IAnamnesico, IEnfermedad, IMascotaGen, proMascota } from '../veterinaria.interface';
import { MASCOTACONST, OCULTAR, VISUALIZAR } from '../service/constants';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-anamnesico',
  templateUrl: './anamnesico.component.html',
  styleUrl: './anamnesico.component.css'
})
export class AnamnesicoComponent implements OnInit {

  imascota: IMascotaGen = MASCOTACONST;

  list =
    [
      { name: 'Moquillo', checked: false },
      { name: 'Parvovirosis', checked: false },
      { name: 'Hepatitis vírica canina', checked: false },
      { name: 'Rabia', checked: false }
    ]

  toppings = new FormControl('');
  enfermedad = new FormControl('');

  toppingList: string[] = ['Parvovirosis (45 días)', 'Pentavalente (60 días)', 'Pentavalente + coronavirus (75 días)', 'Pentavalente + coronavirus ( 90 días)', 'Rabia (120 días)', 'Tos de perreras (opcional) (KC)*',
    'Pentavalente',
    'Polivalente (a los 15 días)',
    '(KC opcional)*',
    'Pentavalente (90 días)',
    'Pentavalente (105 días)',
    'Pentavalente + coronavirus (120 días)',
    'Rabia (135 días)'
  ];

  enfermedadesList: IEnfermedad[] = [];


  // https://www.agrocampo.com.co/plan-de-vacunacion

  fechaUltDesparacita: string = ''
  producto: string = ''
  vacuna: string = ''
  fechaVacuna: string = ''
  marcaVacuna: string = ''
  lote: string = ''
  enfermedadAnterior: string = ''
  tratamiento: string = ''
  evaluacion: string = ''
  entero: string = ''
  esterilizado: string = ''
  fechaUltimoParto: string = ''
  alimentacion: string = ''
  historiaReproductiva: string = ''

  nombreMascota: string = ''
  imageUrl = "https://mnpb2lomnh.execute-api.us-east-2.amazonaws.com/v1/bucketsagevinok?file=9983779.jpeg"

  idVetMascota: string = '';
  idVeterinaria: string = '';


  constructor(private mascotaService: MascotaService, private pacienteService: PacienteService) {
    Promise.resolve().then(() => {
      this.pacienteService.editFormTablaMasc(OCULTAR)
      this.pacienteService.editFormTablaDuenos(OCULTAR);
    });

    this.iniciaVariables();
  }



  ngOnInit(): void {

    this.iniciaVariables();
    // this.pacienteService.editFormTablaMasc(OCULTAR);
    // aaaaaa

  }

  iniciaVariables() {
    console.log(' se oculta la tabla de dueños .... ');
    //   this.pacienteService.editFormTablaDuenos(OCULTAR);

    // aaaaaaaaa 
    this.mascotaService.mascotaGenObserv.subscribe(
      x => {
        this.imascota = x;
        this.nombreMascota = x.nombreMascota;


        this.idVeterinaria = this.pacienteService.getIdVeterinaria();
        this.idVetMascota = x.idVetMascota;
        this.mascotaService.imagesXMascota(this.idVeterinaria, this.idVetMascota).subscribe(x => {
          x;
          console.log('imagen de la mascota ... ', x);
          this.imageUrl = "https://mnpb2lomnh.execute-api.us-east-2.amazonaws.com/v1/bucketsagevinok?file=" + x.image;
        }
        );

        this.imascota.nombreTabla = 'vet_enfermedad';
        console.log('Este es el objeto :: no debe tener especie ... ' , this.imascota)

        this.mascotaService.enfermedadesPorEspecie(this.imascota).subscribe(x => {
          // x;
          this.enfermedadesList = x;
        });

      }
    )






    // aaaa

    // listaImagesXMascota(idVeterinaria: string, idMascota: string)

  }


  guardaInfoAnamnesico() {
    console.log('guardaInfoAnamnesico .... ');

    let idVeterinaria = this.pacienteService.getIdVeterinaria();

    let iAnamnesico: IAnamnesico = {

      'idVetAnamnesico': {
        'S': (Math.random() * 999999999).toString()
      },
      'idVetMascota': {
        'S': this.idVetMascota
      }, 'alimentacion': {
        'S': this.alimentacion
      }, 'enfermedAnterior': {
        'S': this.enfermedadAnterior
      }, 'idVeterinaria': {
        'S': this.idVeterinaria
      }, 'evaluacion': {
        'S': this.evaluacion
      }, 'fechaDesparacitacion': {
        'S': this.fechaUltDesparacita
      }, 'fechaUltParto': {
        'S': this.fechaUltimoParto
      }, 'fechaVacuna': {
        'S': this.fechaVacuna
      }, 'historiaReproductiva': {
        'S': this.historiaReproductiva
      }, 'vacuna': {
        'S': this.vacuna
      }, 'tratamiento': {
        'S': this.vacuna
      }

    }

    this.pacienteService.guardaItemTablaDynamoAnamnesico(iAnamnesico).subscribe(
      x => {
        x;
        let imageGen: IMascotaGen = {
          'idVetMascota': this.idVetMascota,
          'image': '',
          'nombreMascota': '',
          'especie': '',
          'sexo': '',
          'raza': '',
          'color': '',
          'fechaNacimiento': '',
          'peso': '',
          'idVeterinaria': this.idVeterinaria,
          'idPersonaDueno': '',
          'nombreTabla': 'vet_anamnesico',
          'nombreDueno':'',
                 'cedulaDueno':''
        }


        this.mascotaService.vetQueryMascAnamnesico(imageGen).subscribe(x => {
          this.mascotaService.updataSourAnamnesico(x); // , imageGen
          //    sss
        })


      }
    );




    this.pacienteService.editTabAnamnesico(VISUALIZAR);

  }

}
