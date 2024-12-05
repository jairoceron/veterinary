import { Component, ElementRef, EventEmitter, Input, OnInit, Output, VERSION, ViewChild } from '@angular/core';
import { IDuenoMascota, IMascotaGen, MASCOTACONST } from '../veterinaria.interface';
import { PacienteService } from '../service/paciente.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IMASCOTAGENCONST, OCULTAR, VISUALIZAR } from '../service/constants';

import { FormControl, FormGroup } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { debounceTime, map, mergeMap, startWith, tap } from 'rxjs/operators';
import { MascotaService } from '../service/mascota.service';
import { waitForAsync } from '@angular/core/testing';

export class Country {
  constructor(public name: string, public code: string) { }
}

export interface Company {
  companyName: string;
  description?: string;
  id:string
}

@Component({
  selector: 'app-buscpropmascota',
  templateUrl: './buscpropmascota.component.html',
  styleUrl: './buscpropmascota.component.css'
})
export class BuscpropmascotaComponent  implements  OnInit  {


  mcvc : IMascotaGen = IMASCOTAGENCONST;

  name = "Angular " + VERSION.major;

  initialValue = {
    first: 'first name',
    last: 'last name'
  };

  @Input() companyForm : FormGroup = new FormGroup({
    first: new FormControl(this.initialValue.first),
    last: new FormControl(this.initialValue.last),
    company : new FormControl(this.initialValue.last)
  });

  
  @Output() optionSelected = new EventEmitter();
  companydata: Observable<Company[]>= new Observable<Company[]>;


  @ViewChild("input1", { static: false })

 
  companies: Company[] = [
    { companyName: 'IBM', id:'1' },
    { companyName: 'Apple' , id:'2'},
    { companyName: 'Able Woods', id:'3' },
    { companyName: 'Abercrombie' , id:'4'},
    { companyName: 'Abetter' , id:'5'},
    { companyName: 'Facebook' , id:'6'},
    { companyName: 'Google' , id:'7'}
  ];

  private input1 !: ElementRef;

  buscarPropMascT: string = ''

  length: number = 0;

  //countryCtrl: FormControl;
  countryCtrl = new FormControl();
  companyCtrl: FormControl = new FormControl();;

  filteredCountry: Observable<any[]>;
  filteredCompanies: Observable<Company[]> = new Observable<Company[]>;

  country_lis: IMascotaGen[] = [


  ];

  private jsonURL = '/src/app/countries.json';


  filterSearchValue: string = '';
  private _menuItems = [{ "name": "aabb" }, { "name": "aabbcc" }, { "name": "ffgg" }];

  // buscarPropMascT: string = '';
  formPropietaMascota: string = '';

  constructor(private pacienteservice: PacienteService,
    private mascotaService: MascotaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    console.log('zxxxx');
    this.listNombresMascotas();


    
  

    console.log('------------ lista completa ll ', this.country_lis)
    this.filteredCountry = this.countryCtrl.valueChanges.pipe(
      startWith(''),
      map((country) =>
        country ? this.filtercountry(country) : this.country_lis.slice()
      )
    );


    this.companydata = of(this.companies);


    this.companyForm   = new FormGroup({
      first: new FormControl(this.initialValue.first),
      last: new FormControl(this.initialValue.last),
      company : new FormControl(this.initialValue.last)
    });
    

      
      this.filteredCompanies = this.companyCtrl.valueChanges.pipe(
              tap(val => console.log('inside valueChanges Observable, val is: ', val)),
              debounceTime(200))
              .pipe(mergeMap(val => this.filter(val)));



  }


  listNombresMascotas() {
    let imageGen: IMascotaGen = IMASCOTAGENCONST;
    imageGen.idVeterinaria = this.pacienteservice.idVeterinaria;
    imageGen.nombreTabla = 'vet_mascota';

    // let country : Country = {name:'PENSAMIENTO', code:'2'}
    // this.country_lis.push(country)

    this.mascotaService.listaNombreMascotas(imageGen).subscribe(
      x => {
        x;
        console.log('listado de mascotas de esta veterinaria ', x);
        this.country_lis = x
        this.filteredCountry = this.countryCtrl.valueChanges.pipe(
          startWith(''),
          map((country) =>
            country ? this.filtercountry(country) : this.country_lis.slice()
          )
        );
      }
    )
    // zzz
  }


  ingresarMascota() {
    this.pacienteservice.ocultarPartes();

    let imascotaGen: IMascotaGen = MASCOTACONST
    this.mascotaService.updateBehavSub_Mascota(imascotaGen);

    this.pacienteservice.editFormMascocta(VISUALIZAR);
    //  gggggggg

  }

  optionClicked() {

    console.log("xxxx ... " , this.countryCtrl.value) ;
    console.log("valor xxxx __________ ... " , this.countryCtrl) ;
    console.log('teniendo a Dios de nuestro lado ..... ');
    console.log('valor  ', this.countryCtrl.value);

    console.log(' mi invento de pronto funciona :::  ' , this.mcvc );

    let imageGen: IMascotaGen = this.countryCtrl.value;
    this.pacienteservice.editFormMascocta(VISUALIZAR);



    // let imageGen : IMascotaGen = IMASCOTAGENCONST;
    //imageGen.idVeterinaria = this.pacienteservice.idVeterinaria;
    imageGen.nombreTabla = 'vet_mascota';
    // imageGen.nombreMascota = nombreMasct;

    // let country : Country = {name:'PENSAMIENTO', code:'2'}
    // this.country_lis.push(country)

    this.mascotaService.listaNombreMascotas(imageGen).subscribe(x => {
      console.log('Debe serfff este el registro :::: ______ sss ', x);

      this.mascotaService.updateBehavSub_Mascota(x[0]);
      this.mascotaService.idVetMascota = x[0].idVetMascota;
      // aaaaaaaaaaaaaaaaaa
    }

    );

    console.log(" ____ sale del optionClicked sin problemas ....");
    this.countryCtrl = new FormControl();
    this.filteredCountry = this.countryCtrl.valueChanges.pipe(
      startWith(''),
      map((country) =>
        country ? this.filtercountry(country) : this.country_lis.slice()
      )
    );
    // formMascocta === VISUALIZA
    // console.log('valor  ' , this.countryCtrl);
  }
  mostrarMascota() {
    console.log('mas aciertos ..... ');
  }

  filtercountry(nMascotaGen: string | IMascotaGen) {
// aaaaaaaaaa
    // nMascotaGen: IMascotaGen
    const val = (typeof nMascotaGen === 'string') ? nMascotaGen : nMascotaGen.nombreMascota;
    
    this.mcvc = (typeof nMascotaGen !== 'string') ? nMascotaGen : IMASCOTAGENCONST;

    console.log(" desesperanza ::: ", nMascotaGen);
    console.log('name debe ser un objeto de otro tipo ::: ', name);
    console.log(' xxxx ', this.country_lis);
    let arr = this.country_lis.filter(
      // nMascotaGen.nombreMascota.toLowerCase()
      (country) => country.nombreMascota.toLowerCase().indexOf(val.toLowerCase()) === 0
    );

    //this.countryCtrl = new FormControl();

    return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
  }



  ngOnInit() {
    // ...
    console.log("valor con que arraca ... " , this.countryCtrl.value) ;
    console.log("valor con __________ ... " , this.countryCtrl) ;
      
  }




  get menuItems() {
    if (this.filterSearchValue) {
      return this._menuItems.filter(item => item.name.toLowerCase().indexOf(this.filterSearchValue.toLowerCase()) > -1);
    }
    return this._menuItems;
  }
  set menuItems(value) {
    this._menuItems = value;
  }
  focusInput() {
    setTimeout(() => {
      this.input1.nativeElement.focus();
    }, 100);
  }

  buscarPropMasc() {
    console.log("Buscar prop mascota ....");
    let xxxVeterinaria: IDuenoMascota = {
      idVeterinario: this.pacienteservice.getIdVeterinaria(),
      nombreTabla: 'personaDueno',
      apellidos: this.buscarPropMascT
    }

    console.log('filtro digital _____ ', xxxVeterinaria);

    this.pacienteservice.listaPropietariosX0X(xxxVeterinaria).subscribe(x => {
      x;
      console.log('_______________', x);
      // this.formPropietaMascota = VISUALIZAR;
      // this.pacienteservice.editPropMascotaObservable(x);

      this.pacienteservice.updBehDatSouItemPerDue00(x);

      this.pacienteservice.editFormTablaDuenos(VISUALIZAR);
      this.pacienteservice.editFormTablaMasc(OCULTAR);
      this.pacienteservice.editFormMascocta(OCULTAR);
      this.pacienteservice.updateFormBuscaPropObserv(OCULTAR);

    })
  }


  private filter(value: string | Company): Observable<Company[]> {
    const val = (typeof value === 'string') ? value : value.companyName;
    console.log('inside filter, value is: ', value);

    console.log(" GOD help me value ...  " , value );

    if (val) {
        return this.companydata.pipe(map((cos: Company[]) => {
            return cos.filter((co: Company) => {
                return (co.companyName.toLowerCase().search((typeof val === 'string') ? val.toLowerCase() : (<Company> val).companyName.toLowerCase()) !== -1)
            });
        }));
    } else {
        return this.companydata;
    }
   
  }
  

  onSelectionChanged(event: any) {
    console.log('event: option selected is ', event);
     this.optionSelected.emit(event);
  }

  displayCo(company?: string): string {
    console.log(company)
      return company ? company : '';
  }

}
