import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, pairs } from 'rxjs';
import { formatDate } from '@angular/common';
import { IDuenoMascota, IDynamoPersonaDueno00, IImagen, IMascotaGen, IItemDynamo, IMascota, ItemsPersonaDueno, IVeterinaria, listMascota, Pais, Pqrs, proMascota, VetImages, IAnamnesicoGen, IRazasGen, IEnfermedad } from '../veterinaria.interface';
import { MASCOTACONST, VISUALIZAR, IESPECIESCONST  } from './constants';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  dtSourAnamnes = new MatTableDataSource<IAnamnesicoGen>([]);
  private datSourcdtSourAnamnesBehSubj = new BehaviorSubject<MatTableDataSource<IAnamnesicoGen>>(this.dtSourAnamnes);
  datSourcdtSourAnamnesObservable: Observable<MatTableDataSource<IAnamnesicoGen, MatPaginator>> = this.datSourcdtSourAnamnesBehSubj.asObservable();

  mascotaGen: IMascotaGen = MASCOTACONST;
  private mascotaGenBehSubj = new BehaviorSubject<IMascotaGen>(this.mascotaGen);
  mascotaGenObserv: Observable<IMascotaGen> = this.mascotaGenBehSubj.asObservable();


  idVetMascota: string = '';
  private idVetMascotaBehSubj = new BehaviorSubject<string>(this.idVetMascota);
  idVetMascotaObserv: Observable<string> = this.idVetMascotaBehSubj.asObservable();

  constructor(private http: HttpClient) { }

  public init() {
  }

  updataSourAnamnesico(ianame: IAnamnesicoGen[]) {   //, imageGen:IMascotaGen
    //****
    // this.vetQueryMascAnamnesico(imageGen);
    console.log('vector anamnesico ::: ', ianame)
    this.datSourcdtSourAnamnesBehSubj.next(new MatTableDataSource(ianame));

  }

  updateBehavSub_Mascota(imascotaGen: IMascotaGen) {
    this.mascotaGenBehSubj.next(imascotaGen);
  }

  updateBehavSub_IdVetMa(idVetMascota: string) {
    this.idVetMascotaBehSubj.next(idVetMascota);
  }

  mascotaPorId(imageGen: IMascotaGen): Observable<listMascota> {

    let direccion = "https://3w7g59yej7.execute-api.us-east-2.amazonaws.com/dev/vetQueryMascPorId";

    console.log("consulta de mascotas :: direccion REST ____ ::: ", direccion)

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<listMascota>(direccion, imageGen, {
      'headers': customHeaders,
    });

  }

  razasPorEspecie(imageGen: IMascotaGen): Observable<IRazasGen[]> {
   // aaaaaaaaaaaaaaa
    let direccion = "https://3w7g59yej7.execute-api.us-east-2.amazonaws.com/dev/vetQueryRazasEsp";

   // console.log("consulta de razas :: direccion REST ____ ::: ", direccion)

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<IRazasGen[]>(direccion, imageGen, {
      'headers': customHeaders,
    });

  }

  enfermedadesPorEspecie(imageGen: IMascotaGen): Observable<IEnfermedad[]> {
  // aaaaaaaaaaaaaa
     let direccion = "https://3w7g59yej7.execute-api.us-east-2.amazonaws.com/dev/vetQueryEnferEsp";
 
     let lineax = "Bearer " + localStorage.getItem("token");
     let customHeaders = new HttpHeaders();
     customHeaders = customHeaders.append('content-type', 'application/json');
     customHeaders = customHeaders.append('Authorization', lineax);
 
     return this.http.post<IEnfermedad[]>(direccion, imageGen, {
       'headers': customHeaders,
     });
 
   }
 


  imagesXMascota(idVeterinaria: string, idMascota: string): Observable<VetImages> {

    let direccion = "https://3w7g59yej7.execute-api.us-east-2.amazonaws.com/dev/vetQueryVetImages";

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    let xxxVeterinaria: IVeterinaria = {
      idVeterinaria: idVeterinaria,
      nombreTabla: 'vet_images',
      idVetMascota: idMascota,

    }

    console.log('imagesXMascota ::  IVeterinaria ... ', xxxVeterinaria);

    // gggggggggggggg   

    return this.http.post<VetImages>(direccion, xxxVeterinaria, {
      'headers': customHeaders,
    });


  }

  listaNombreMascotas(imageGen: IMascotaGen): Observable<IMascotaGen[]> {
    // sssssssssss

    console.log('parametros fa am :::: ' , imageGen);

    let direccion = "https://3w7g59yej7.execute-api.us-east-2.amazonaws.com/dev/vetQueryMascPorNombre";

    // console.log("consulta de razas :: direccion REST ____ ::: ", direccion)
 
     let lineax = "Bearer " + localStorage.getItem("token");
     let customHeaders = new HttpHeaders();
     customHeaders = customHeaders.append('content-type', 'application/json');
     customHeaders = customHeaders.append('Authorization', lineax);
 
     return this.http.post<IMascotaGen[]>(direccion, imageGen, {
       'headers': customHeaders,
     });


  }

  vetQueryMascAnamnesico(imageGen: IMascotaGen): Observable<IAnamnesicoGen[]> {
    // ddd
    let direccion = "https://3w7g59yej7.execute-api.us-east-2.amazonaws.com/dev/vetQueryMascAnamnesico";
    console.log("consulta de mascotas :: dir---- REST ____ ::: ", direccion)

    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);



    let ll = this.http.post<IAnamnesicoGen[]>(direccion, imageGen, {
      'headers': customHeaders,
    });

    ll.subscribe(x => {
      x;
      this.updataSourAnamnesico(x);
    })

    // this.updataSourAnamnesico(ll.subscribe(x => {


    // }));

    // this.updataSourAnamnesico(ll.)

    return ll;

  }



}
