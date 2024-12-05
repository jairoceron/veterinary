import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, pairs } from 'rxjs';
import { formatDate } from '@angular/common';
import { IAnamnesico, IDuenoMascota, IDynamoPersonaDueno00, IImagen, IItemDynamo, IMascota,  IMascotaGen,  ItemsPersonaDueno, IVeterinaria, listMascota, Pais, Pqrs, proMascota } from '../veterinaria.interface';
import { IMAGE_JPEG, OCULTAR, VISUALIZAR } from './constants';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {


  dataSource = new MatTableDataSource<ItemsPersonaDueno>([]);
  private datSourcItemPerDuenoBehSubj = new BehaviorSubject<MatTableDataSource<ItemsPersonaDueno>>(this.dataSource);
  datSourcItemPerDuenoObservable : Observable<MatTableDataSource<ItemsPersonaDueno, MatPaginator>> = this.datSourcItemPerDuenoBehSubj.asObservable();

  datSourMascota = new MatTableDataSource<IMascotaGen >([]);
  private datSourcItemMascotaBehSubj = new BehaviorSubject<MatTableDataSource<IMascotaGen >>(this.datSourMascota);
  datSourcItemMascObservable : Observable<MatTableDataSource<IMascotaGen , MatPaginator>> = this.datSourcItemMascotaBehSubj.asObservable();



  max = 10000000;
  private idPersonaDuenoBehSubj = new BehaviorSubject<number>(Math.random() * this.max);
  idPersonaDuenoObservable = this.idPersonaDuenoBehSubj.asObservable();


  private dataSouPersDuenBehSubj = new BehaviorSubject<ItemsPersonaDueno[]>([])            // <ItemsPersonaDueno>([])>;
  dataSouPersDuenObservable = this.dataSouPersDuenBehSubj.asObservable();

  itemsPersDueno: ItemsPersonaDueno = {
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

  private itemsPersonaDuenoBehSubj = new BehaviorSubject<ItemsPersonaDueno>(this.itemsPersDueno);
  itemPersoDuenoObservable = this.itemsPersonaDuenoBehSubj.asObservable();



  proMascotaX: proMascota = { Items: [] };
  private propMascotaBehaSubj = new BehaviorSubject<proMascota>(this.proMascotaX);
  propMascotaObservable = this.propMascotaBehaSubj.asObservable();



  private formPropMascota = new BehaviorSubject<string>(VISUALIZAR);
  private formTablaDuenos = new BehaviorSubject<string>(VISUALIZAR);
  private formMascocta = new BehaviorSubject<string>(VISUALIZAR);
  private formTablaMasc = new BehaviorSubject<string>(VISUALIZAR);
  private formAnamnesico = new BehaviorSubject<string>(VISUALIZAR);
  private formExaClinico = new BehaviorSubject<string>(VISUALIZAR);
  private formBuscaPropBehaSubjec = new BehaviorSubject<string>(VISUALIZAR);
  private tabAnamnesico = new BehaviorSubject<string>(VISUALIZAR);


  castFPropietMascota = this.formPropMascota.asObservable();
  formTablaDuenosObserv = this.formTablaDuenos.asObservable();
  formMascoctaObserv = this.formMascocta.asObservable();
  formTablaMascObserv = this.formTablaMasc.asObservable();
  formAnamnesicoObserv = this.formAnamnesico.asObservable();
  formExaClinicoObserv = this.formExaClinico.asObservable();
  formBuscaPropObserv  = this.formBuscaPropBehaSubjec.asObservable();
  formTabAnamnesicoObserv  = this.tabAnamnesico.asObservable();

  private idNombreImgBehSubj = new BehaviorSubject<string>(IMAGE_JPEG);
  nombreImagenObservable = this.idNombreImgBehSubj.asObservable();

  idVeterinaria: string = '';
  idPersonaDueno: string = '';

  constructor(private http: HttpClient

  ) { }

  public init() {
  }

  updateFormBuscaPropObserv(newUser: string) {
    this.formBuscaPropBehaSubjec.next(newUser);
  } 

  updateIdPersonaDueno(newUser: number) {
    this.idPersonaDuenoBehSubj.next(newUser);
  }

  getDatSouPersonaDueno() : MatTableDataSource<ItemsPersonaDueno> {
    return this.dataSource
  }


  updBehDatSouItemPerDue00(x : proMascota) {
    this.dataSource = new MatTableDataSource<ItemsPersonaDueno>(x.Items);
    this.datSourcItemPerDuenoBehSubj.next(this.dataSource);
  }


  updateBehaDatSourcItemPerDueno(idVeterinaria: string) {
    this.listaPropietariosX0(idVeterinaria).subscribe( 
      x => {
        this.dataSource = new MatTableDataSource<ItemsPersonaDueno>(x.Items);
        this.datSourcItemPerDuenoBehSubj.next(this.dataSource);
      }
      
    )
  }

  updateBehaDatSourcItemPerDuenoPeD(idVeterinaria: string, idPerDuen: string) {
    this.listaPropietariosPerDue(idVeterinaria, idPerDuen ).subscribe( 
      x => {
        this.dataSource = new MatTableDataSource<ItemsPersonaDueno>(x.Items);
        this.datSourcItemPerDuenoBehSubj.next(this.dataSource);
      }
      
    )



    // this.dataSource = new MatTableDataSource<ItemsPersonaDueno>(x.Items);
/*
    this.propMascotaObservable.subscribe(x => {
      this.dataSource = new MatTableDataSource<ItemsPersonaDueno>(x.Items);
      this.datSourcItemPerDuenoBehSubj.next(this.dataSource);

    }); */

  }


  updateItemPersoDueno(newUser: ItemsPersonaDueno) {
    this.itemsPersonaDuenoBehSubj.next(newUser);
  }


  editPropMascotaObservable(newUser: proMascota) {
    this.propMascotaBehaSubj.next(newUser);
  }


  editformPropMascota(newUser: string) {
    this.formPropMascota.next(newUser);
  }
  editFormTablaDuenos(newUser: string) {
    this.formTablaDuenos.next(newUser);
  }
  editFormMascocta(newUser: string) {
    this.formMascocta.next(newUser);
  }
  editFormTablaMasc(newUser: string) {
    this.formTablaMasc.next(newUser);
  }
  editFormAnamnesico(newUser: string) {
    this.formAnamnesico.next(newUser);
  }
  editFormExaClinico(newUser: string) {
    this.formExaClinico.next(newUser);
  }

  editTabAnamnesico(newUser: string) {
    this.tabAnamnesico.next(newUser);
  }



  setDataSouPersDuenBehSubj(nombreImagen: string) {


    //  this.dataSouPersDuenBehSubj.next(nombreImagen);
  }



  setNombreImagen(nombreImagen: string) {
    this.idNombreImgBehSubj.next(nombreImagen);
  }





  listaMascotas(): Observable<string> {

    let url = "https://bhiqiecpl3.execute-api.us-east-2.amazonaws.com/tttt";

    let jsonX = { 'lola': 'lola', 'gig': 'gig' }

    return this.http.get<string>(url, {
      params: new HttpParams()

    });
  }

  setIdVeterinaria(idVeterinaria: string) {
    this.idVeterinaria = idVeterinaria;
  }

  getIdVeterinaria() {
    return this.idVeterinaria;
  }

  setIdPersonaDueno(idPersonaDueno: string

  ) {
    this.idPersonaDueno = idPersonaDueno;
  }
  getIdPersonaDueno() {
    return this.idPersonaDueno;
  }

  setFormPropMascota(formPropMascota: string) {
    // this.formPropMascota = formPropMascota;
    this.formPropMascota.next(formPropMascota)
  }

  getFormPropMascota() {
    return this.formPropMascota;
  }

  searchHeroes(term: string): Observable<String[]> {
    // term = term.trim();

    let xxterm = "----------------------";

    let heroesUrl = "https://bhiqiecpl3.execute-api.us-east-2.amazonaws.com/tttt";

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
      { params: new HttpParams().set('name', term) } : {};

    return this.http.get<String[]>(heroesUrl, options);
  }

  updateRadicado(itemDynamoDB: IDynamoPersonaDueno00): Observable<String> {
    // let direccion = "https://06y0ttw0t9.execute-api.us-east-2.amazonaws.com/helloworldapppost";

    console.log("aqui vamos ...... 001 ", itemDynamoDB);

    let direccion = "https://27jm8ompn8.execute-api.us-east-2.amazonaws.com/propietarioMascota";

    let fff = {
      'idPersonaDueno': {
        'S': '007_00'
      },
      'nombres': {
        'S': 'DEMBELE_00'
      },
      'apellidos': {
        'S': 'FRANCE_BELGIQUE'
      }
    }



    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    let xxxpais: Pais = { country: 'El norte' }

    //    return this.http.post<String>(direccion, itemDynamoDB, {
    //    'headers':customHeaders ,
    //   });


    return this.http.post<String>(direccion, itemDynamoDB, {
      'headers': customHeaders,
    });


  }

  // 9999sssssssssssssssssc
  listaPropietariosX0(idVeterinaria: string): Observable<proMascota> {

    let direccion = "https://bkbgvpt2g8.execute-api.us-east-2.amazonaws.com/veterinDb";

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    let xxxVeterinaria: IVeterinaria = {
      idVeterinaria: idVeterinaria,
      nombreTabla: 'personaDueno'
    }

    
// ddd
    return this.http.post<proMascota>(direccion, xxxVeterinaria, {
      'headers': customHeaders,
    });
  }

  listaPropietariosPerDue(idVeterinaria: string, idPersonaDueno: string): Observable<proMascota> {

    let direccion = "https://bkbgvpt2g8.execute-api.us-east-2.amazonaws.com/vetQuerMascPorOwn";

   // https://bkbgvpt2g8.execute-api.us-east-2.amazonaws.com/dev

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

// aaaaaaaaaaaaaaaaaaa

    let xxxVeterinaria: IVeterinaria = {
      idVeterinaria: idVeterinaria,
      nombreTabla: 'personaDueno',
      idPersonaDueno: idPersonaDueno
    }
    console.log(' yyyVeterinaria ' , xxxVeterinaria)
    console.log(' direccion ' , direccion );
    
// ddd
    return this.http.post<proMascota>(direccion, xxxVeterinaria, {
      'headers': customHeaders,
    });


  }


  listaPropietariosX00(idVeterinaria: string): Observable<proMascota> {

    let direccion = "https://bkbgvpt2g8.execute-api.us-east-2.amazonaws.com/veterinDb";

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    let xxxVeterinaria: IVeterinaria = {
      idVeterinaria: idVeterinaria,
      nombreTabla: 'personaDueno'
    }

    return this.http.post<proMascota>(direccion, xxxVeterinaria, {
      'headers': customHeaders,
    });


  }



  listaImagesXMascota(idVeterinaria: string, idMascota: string): Observable<proMascota> {

    let direccion = "https://bkbgvpt2g8.execute-api.us-east-2.amazonaws.com/veterinDb";

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    let xxxVeterinaria: IVeterinaria = {
      idVeterinaria: idVeterinaria,
      nombreTabla: 'vet_images',
      idMascota: idMascota,

    }

    console.log('IVeterinaria ... ', xxxVeterinaria);

     // gggggggggggggg   https://3w7g59yej7.execute-api.us-east-2.amazonaws.com/dev/vetQueryVetImages

    return this.http.post<proMascota>(direccion, xxxVeterinaria, {
      'headers': customHeaders,
    });


  }


  eliminarPropMascota(idPersonaDueno: string) {

    let direccion = "https://vr5hv0qse0.execute-api.us-east-2.amazonaws.com/elimPropMascota";

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    let xxxPropMascota = { idPersonaDueno: idPersonaDueno }

    return this.http.post<proMascota[]>(direccion, xxxPropMascota, {
      'headers': customHeaders,
    });


  }

  editDataFormPropMascota(idPersonaDueno: string) {

    console.log("ZZZ idPersonaDueno --------- ", idPersonaDueno)

    let direccion = "https://3w7g59yej7.execute-api.us-east-2.amazonaws.com/dev/queryIdPropMascota";
    // un API Gateway con dos o associate to the two lambda functions

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    let xxxPropMascota = { idPersonaDueno: idPersonaDueno }
    console.log('wwwwwwwww >>> ', xxxPropMascota);

    return this.http.post<proMascota>(direccion, xxxPropMascota, {
      'headers': customHeaders,
    });


  }



  listaPropietariosX(idVeterinaria: string): Observable<proMascota[]> {

    let direccion = "https://bkbgvpt2g8.execute-api.us-east-2.amazonaws.com/veterinDb";

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    let xxxVeterinaria: IVeterinaria = {
      idVeterinaria: idVeterinaria,
      nombreTabla: 'personaDueno'
    }

    return this.http.post<proMascota[]>(direccion, xxxVeterinaria, {
      'headers': customHeaders,
    });

  }

  updateDatSourc(idVeterinaria: string, idPersonaDueno: string) {
    let itemx = this.listaMascotassPersonaDueno(idVeterinaria, idPersonaDueno).subscribe(
        x => {
          this.datSourMascota = new MatTableDataSource<IMascotaGen >(x.Items);
          console.log('x.Items ::: PAso 1 ',  x.Items);
          
          this.datSourcItemMascotaBehSubj.next(this.datSourMascota)       ;

          
        }

    )

  }


  listaMascotassPersonaDueno(idVeterinaria: string, idPersonaDueno: string): Observable<listMascota> {
//********
   
    let direccion = "https://dwvtqutbie.execute-api.us-east-2.amazonaws.com/list_items";
    console.log('Api Gateway xxxx  ' , direccion )

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    let xxxVeterinaria: IVeterinaria = {
      idVeterinaria: idVeterinaria,
      nombreTabla: 'vet_mascota',
      idPersonaDueno: idPersonaDueno.toString()
    }
    console.log(' parametros consulta lista mascotas ', xxxVeterinaria)
    console.log(' parametros ... ')

    return this.http.post<listMascota>(direccion, xxxVeterinaria, {
      'headers': customHeaders,
    });

  }


  listaMascotass(idVeterinaria: string): Observable<listMascota> {
// aaaaaaaaaa

    let direccion = "https://dwvtqutbie.execute-api.us-east-2.amazonaws.com/list_items";

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);




    let xxxVeterinaria: IVeterinaria = {
      idVeterinaria: idVeterinaria,
      nombreTabla: 'vet_mascota',
      //idPersonaDueno: idPersonaDueno.toString()
    }


    console.log(' parametros consulta lista mascotas ', xxxVeterinaria)

    return this.http.post<listMascota>(direccion, xxxVeterinaria, {
      'headers': customHeaders,
    });

  }


  /*
  listaPropietariosX(idVeterinaria : string)  :  Observable  <IDynamoPersonaDueno00[]> {
    
    let direccion = "https://bkbgvpt2g8.execute-api.us-east-2.amazonaws.com/veterinDb";

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    let xxxpais: Pais = { country: 'El norte' }

  // ssssssssssss
  // export interface IVeterinaria {
    //idVeterinaria: string
  // }
    

    let xxxVeterinaria: IVeterinaria = { idVeterinaria: idVeterinaria }

    return this.http.post<IDynamoPersonaDueno00[]>(direccion, xxxVeterinaria, {
      'headers': customHeaders,
    });


  }

*/
  listaPropietarios(idVeterinaria: string): Observable<IDynamoPersonaDueno00[]> {

    let direccion = "https://bkbgvpt2g8.execute-api.us-east-2.amazonaws.com/veterinDb";

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    let xxxpais: Pais = { country: 'El norte' }

    // ssssssssssss
    // export interface IVeterinaria {
    //idVeterinaria: string
    // }


    let xxxVeterinaria: IVeterinaria = {
      idVeterinaria: idVeterinaria,
      nombreTabla: 'personaDueno'
    }

    return this.http.post<IDynamoPersonaDueno00[]>(direccion, xxxVeterinaria, {
      'headers': customHeaders,
    });


  }


  guardaMascota(iMascota: IMascota): Observable<String> {


    console.log("con lo de la mascota ... ...... 0021 ", iMascota); 

    // let direccion = "https://nis0m19xj9.execute-api.us-east-2.amazonaws.com/vet_mascota";
    let direccion = "https://nis0m19xj9.execute-api.us-east-2.amazonaws.com/dev/vet_mascota";

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<String>(direccion, iMascota, {
      'headers': customHeaders,
    });


  }

  guardaImagenTablaDynamo(iImagen: IImagen): Observable<String> {


    console.log("guarda imagen ... ...... 001 ", iImagen);

    // let direccion = "https://g5xhxbdn7b.execute-api.us-east-2.amazonaws.com/dev/vet_crud_vetimages";


    // esto guarda en la tabla vet_images ::: 
    let direccion = "https://2fnm4zarc2.execute-api.us-east-2.amazonaws.com/dev/vet_crud_vetimages";
    let lineax = "Bearer " + localStorage.getItem("token");
    
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);
    console.log('xxx07 ', iImagen)
    return this.http.post<String>(direccion, iImagen, {
      'headers': customHeaders,
    });


  }


 // eeeeeeeeeeeeeeee44
  guardaItemTablaDynamoAnamnesico(iAnamnesico: IAnamnesico): Observable<String> {
    console.log("guarda imagen ..xxx01 ", iAnamnesico);

    // esto guarda en la tabla vet_anamnesico ::: 
    let direccion = "https://2fnm4zarc2.execute-api.us-east-2.amazonaws.com/dev/vet_crud_generico";
    

    let lineax = "Bearer " + localStorage.getItem("token");
    console.log('xxx06')
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);
    
    return this.http.post<String>(direccion, iAnamnesico, {
      'headers': customHeaders,
    });


  }



  listaPropietariosX0X(xxxVeterinaria: IDuenoMascota): Observable<proMascota> {

    let direccion = "https://3w7g59yej7.execute-api.us-east-2.amazonaws.com/dev/queryVet00";

    console.log("consulta propietarios mascotas :: direccion REST ::: ", direccion)

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    let xxxpais: Pais = { country: 'El norte' }

    // ssssssssssss
    // export interface IVeterinaria {
    //idVeterinaria: string
    // }




    return this.http.post<proMascota>(direccion, xxxVeterinaria, {
      'headers': customHeaders,
    });


  }


   ocultarPartes() {
    
    this.updateFormBuscaPropObserv(OCULTAR);
    this.editformPropMascota(OCULTAR);
    this.editFormTablaDuenos(OCULTAR);
    this.editFormMascocta(OCULTAR);
    this.editFormTablaMasc(OCULTAR);
    this.editFormAnamnesico(OCULTAR);
    this.editFormExaClinico(OCULTAR);
    this.editTabAnamnesico(OCULTAR);

   }



}
