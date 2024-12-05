
import { MatTableDataSource } from '@angular/material/table';
import { IMascotaGen,  ItemsPersonaDueno, listMascota, proMascota } from '../veterinaria.interface';
import { PacienteService } from '../service/paciente.service';
import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogMascotaComponent } from '../dialog-mascota/dialog-mascota.component';
import { MASCOTACONST, VISUALIZAR } from '../service/constants';
import { MascotaService } from '../service/mascota.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tabmasc',
  templateUrl: './tabmasc.component.html',
  styleUrl: './tabmasc.component.css'
})
export class TabmascComponent  implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator  | null = null;

  pageNumber: any;  
  ngOnInit() {
    this.listPropietarioVeterinariaPet();
    this.dataSource.paginator = this.paginator;
  }

  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  // dataSource = new MatTableDataSource<proMascota>([]);

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);


  dataSource = new MatTableDataSource<IMascotaGen >([]);

  // displayedColumns = ['position', 'name', 'weight', 'symbol','test','test1','test2','test3','test4','test5','test6','test7','test8'];




  displayedColumns = ['idPersonaDueno', 'idVetMascota', 'nombreMascota', 'raza'];

  //dataX : proMascota[	] = [];
  //dataX_00 : proMascota.Items 
  dataX00: proMascota = { Items: [] };



  constructor(
    private pacienteservice: PacienteService,
    private mascotaService: MascotaService
  ) {

 //   this.listPropietarioVeterinariaPet();
  }


  listPet() {
    console.log('entra por aca 00 ??')
    let listMascota: listMascota = { Items: [] };

    let idVeterinaria: string = this.pacienteservice.getIdVeterinaria();
    this.pacienteservice.listaMascotass(idVeterinaria).subscribe(x => {
      listMascota = x;
      //   console.log('  listado de mascotas !!!!  ',listMascota) ;
      console.log('  listado de mascotas !!!!  ', listMascota.Items);


      this.dataSource = new MatTableDataSource<IMascotaGen >(listMascota.Items);
      this.dataSource.paginator = this.paginator;
      //*******************
      // aaaaaaaaaaa
    })


  }

  listPropietarioVeterinariaPet() {


    let listMascota: listMascota = { Items: [] };

    let idVeterinaria: string = this.pacienteservice.getIdVeterinaria();
    let idPersonaDueno: string = this.pacienteservice.getIdPersonaDueno();

    //this.pacienteservice.idPersonaDuenoObservable.subscribe(x => {
    //  let idPersonaDueno = x;
    // })


    // ffffff
    console.log('!!!!!!!!!!!!!!!!! : xxxxxxxxxxxxxxxxx :::');
    this.pacienteservice.datSourcItemMascObservable.subscribe(x => {
      //  listMascota = x;
      this.dataSource = x;
      console.log('xxxxxxxxxxxxxxxx : xxxxxxxxxxxxxxxxx :::');
      this.dataSource.paginator = this.paginator;
      console.log("Este es el datasource :: " , x);

    })

    console.log('entra por aca 01 ?? idVeterinaria  ', idVeterinaria, ' idPersonaDueno ', idPersonaDueno)

    /*
    this.pacienteservice.listaMascotassPersonaDueno(idVeterinaria, idPersonaDueno).subscribe(x => {
      listMascota = x;
      this.dataSource = new MatTableDataSource<ItemsMascotaX>(listMascota.Items);

    })  */

  }



  eliminarDuenoMascota(idP: string) {
    console.log(" eliminar dueno mascota ....  ", idP);

    this.pacienteservice.eliminarPropMascota(idP).subscribe(x => {
      x;
      console.log('eliminado el registro  ?? ', x);
    })
  }


  visualizarImagenMascota(idMascota: string) {
    console.log(" visualizacion de la mascota ------ ....  ", idMascota);

    const dialogRef = this.dialog.open(DialogMascotaComponent, {
      data: { name: this.name(), animal: this.animal(), idMascota: idMascota },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }


  historiaMascota(idVetMascota: string) {
    console.log(" visualizacion de la mascota --- ....  ", idVetMascota);

    /*
    const dialogRef = this.dialog.open(DialogMascotaComponent, {
      data: { name: this.name(), animal: this.animal(), idMascota: idVetMascota},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
    */

    this.pacienteservice.editFormAnamnesico(VISUALIZAR);
    this.mascotaService.updateBehavSub_IdVetMa(idVetMascota); 
    let idVeterinaria = this.pacienteservice.getIdVeterinaria();
    let idPersonaDueno = this.pacienteservice.getIdPersonaDueno();


    let mascotaGen : IMascotaGen = MASCOTACONST;
    
    mascotaGen.nombreTabla = 'vet_mascota';
    mascotaGen.idVetMascota = idVetMascota;
    mascotaGen.idVeterinaria = idVeterinaria;
    mascotaGen.idPersonaDueno = idPersonaDueno;

    console.log ('MASCOTA GEN :: ' , mascotaGen);

    this.mascotaService.mascotaPorId(mascotaGen).subscribe(
      x=> {
        x;
        console.log('volvi .... ' , x.Items );

        this.mascotaService.updateBehavSub_Mascota(x.Items[0]);
      }
    );




  }

}



