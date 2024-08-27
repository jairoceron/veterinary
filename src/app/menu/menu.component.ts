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
   console.log('xxxxx66666666666666666666666666'); 
  }

  toggleX(x:string) {
    console.log('fffffffff aa ddd');
  }

  
  myFunction() {
    console.log('ggg 959292  66666666666666666666'); 
  }

  arrowFunc = () => {
    console.log('xxxxx66666666666vv666666666666666'); 
  }

  funcInvokedInline () {
    console.log('xxxxx666666sssssss66666666666666666666'); 
  }

}
