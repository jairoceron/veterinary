import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { IAfiliado, IContrato, IdataPost } from '../afiliado/interfaz/nuevaEps';

export const VISUALIZAR = 'visualizar';

@Injectable({
  providedIn: 'root'
})
export class AfiliadoService {



  private tabContrato = new BehaviorSubject<string>(VISUALIZAR);
  tabContratoObserv = this.tabContrato.asObservable();

  edittabContrato(nuevoEstado: string) {
    this.tabContrato.next(nuevoEstado);
  }

  getFormPropMascota() {
    return this.tabContrato;
  }


  constructor(private http: HttpClient) { }

  guardaItemTablaDynamoAnamnesico(iAnamnesico: IAfiliado): Observable<String> {
    console.log("guarda imagen ..xxx01 ", iAnamnesico);

    // esto guarda en la tabla vet_anamnesico ::: 
   // let direccion = "https://2fnm4zarc2.execute-api.us-east-2.amazonaws.com/dev/vet_crud_generico";
    
    let direccion = "https://3w7g59yej7.execute-api.us-east-2.amazonaws.com/dev/savePacienteEPS";

    let lineax = "Bearer " + localStorage.getItem("token");
    console.log('xxx06')
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);
    
    return this.http.post<String>(direccion, iAnamnesico, {
      'headers': customHeaders,
    });
    

  }

  consultaContratosEps(idataPost: IdataPost) : Observable<IContrato[]> {
  //  console.log('uery contratos eps ', idataPost);
// ddd
    
    
    let direccion = "https://3w7g59yej7.execute-api.us-east-2.amazonaws.com/dev/queryPacienteEPS";

    //               https://3w7g59yej7.execute-api.us-east-2.amazonaws.com/dev/queryPacienteEPS


    console.log('xxx06')
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    //let lineax = "Bearer " + localStorage.getItem("token");
    //customHeaders = customHeaders.append('Authorization', lineax);
    
    return this.http.post<IContrato[]>(direccion, idataPost, {
      'headers': customHeaders,
    });


  }


  listaPropietariosX0X(xxxVeterinaria: IdataPost): Observable<IdataPost> {

    let direccion = "https://3w7g59yej7.execute-api.us-east-2.amazonaws.com/dev/queryVet00";

    console.log("consulta propietarios mascotas :: direccion REST ::: ", direccion)

    let lineax = "Bearer " ;
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

   // let xxxpais: Pais = { country: 'El norte' }

    // ssssssssssss
    // export interface IVeterinaria {
    //idVeterinaria: string
    // }




    return this.http.post<IdataPost>(direccion, xxxVeterinaria, {
      'headers': customHeaders,
    });


  }


}
