import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, pairs } from 'rxjs';
import { formatDate } from '@angular/common';
import { IDynamoPersonaDueno00, IItemDynamo, IMascota, ItemsMascotaX, IVeterinaria, listMascota, Pais, Pqrs, proMascota } from '../veterinaria.interface';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {



  idVeterinaria: string = '';

  constructor(private http: HttpClient) { }

  public init() {
  }



  listaMascotas(): Observable<string> {

    let url = "https://bhiqiecpl3.execute-api.us-east-2.amazonaws.com/tttt";

    let jsonX = { 'lola': 'lola', 'gig': 'gig' }

    return this.http.get<string>(url, {
      params: new HttpParams()

    });
  }

  setIdVeterinaria(idVeterinaria: string

  ) {
    this.idVeterinaria = idVeterinaria;
  }

  getIdVeterinaria() {
    return this.idVeterinaria;
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


  listaPropietariosX0(idVeterinaria: string): Observable<proMascota> {

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

  listaMascotass(idVeterinaria: string): Observable<listMascota> {


    let direccion = "https://dwvtqutbie.execute-api.us-east-2.amazonaws.com/list_items";

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);




    let xxxVeterinaria: IVeterinaria = {
      idVeterinaria: idVeterinaria,
      nombreTabla: 'vet_mascota'
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


    console.log("con lo de la mascota ... ...... 001 ", iMascota);

    let direccion = "https://nis0m19xj9.execute-api.us-east-2.amazonaws.com/vet_mascota";

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<String>(direccion, iMascota, {
      'headers': customHeaders,
    });


  }




}
