
import { Component, inject, model, OnInit, signal } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { AsyncSubject, catchError, map, Observable, throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectionStrategy,  ViewChild } from '@angular/core';
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
import { MatPaginator } from '@angular/material/paginator';
import { IContrato, IdataPost } from '../afiliado/interfaz/nuevaEps';
import { AfiliadoService } from '../service/afiliado.service';

@Component({
  selector: 'app-tafiliado',
  standalone: false,

  templateUrl: './tafiliado.component.html',
  styleUrl: './tafiliado.component.css'
})
export class TafiliadoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator  | null = null;

  displayedColumns = ['idcontrato', 'modalidad', 'regimen', 'numero'];



  pageNumber: any;  
  ngOnInit() : void {
   
    //this.dataSource.paginator = this.paginator;
    this.consultaQueryServicio();
    // this.listaPropietariosX0X() ;
  }

  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  // dataSource = new MatTableDataSource<proMascota>([]);

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);


  dataSource = new MatTableDataSource<IContrato>([]);

  constructor(
    private http: HttpClient,
    private afiliadoService: AfiliadoService
  ) {

  }

  consultaQueryServicio() {

    let idataPost: IdataPost = { nombreTabla : 'eps_contrato'}

    this.afiliadoService.consultaContratosEps(idataPost).subscribe( x => {
      x;
    //  console.log(x);
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.paginator = this.paginator;
    })
  }

 
}

