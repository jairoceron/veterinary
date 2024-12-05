import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../service/paciente.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent  implements OnInit {


  idVeterinaria = ''

  constructor(private pacienteService : PacienteService) {}


  ngOnInit(): void {

    this.idVeterinaria = this.pacienteService.getIdVeterinaria();   
    // throw new Error('Method not implemented.');
  }

  name = 'Angular';
  buttonValue: string= '';
  
  

  toggle() {
   console.log('001'); 
  }

  toggleX(x:string) {
    console.log('fffffffff aa ddd');
  }

  
  myFunction() {
    console.log('ggg 959292  002'); 
  }

  arrowFunc = () => {
    console.log('xxxxx003'); 
  }

  funcInvokedInline () {
    console.log('xxxxx004'); 
  }

}
