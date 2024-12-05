import { Component } from '@angular/core';

@Component({
  selector: 'app-examenclinico',
  templateUrl: './examenclinico.component.html',
  styleUrl: './examenclinico.component.css'
})
export class ExamenclinicoComponent {
    respiratoria : string = '';
    cardiaca : string = '';
    temperatura : string = '';
    pulso : string = '';
    llenadoCapilar : string = '';
    gangliosLinfaticos : string = '';
    mucosas : string = '';
}
