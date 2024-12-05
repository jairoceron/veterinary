import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { PacienteService } from './service/paciente.service';
import { OCULTAR, VISUALIZAR } from './service/constants';
import { AfiliadoService } from './service/afiliado.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  tabContrato : string = 'OCULTAR';

  idVeterinaria: string | undefined;
  fullName: string = '';
  email: string | undefined;

  formBuscaProp = VISUALIZAR;
  formPropMascota = VISUALIZAR;
  formTablaDuenos = VISUALIZAR;
  formMascocta = VISUALIZAR;
  formTablaMasc = VISUALIZAR;
  formAnamnesico = VISUALIZAR;
  formExaClinico = VISUALIZAR;
  tabAnamnesico = VISUALIZAR;

  VISUALIZAR: String = VISUALIZAR;



  constructor(private authService: AuthService, private router: Router, private amplifyService: AuthenticatorService,
    private pacienteService: PacienteService,
    private afiliadoService: AfiliadoService


  ) {

    //  this.ngOnInit();
   // window.location.reload();

   
    this.router.navigate([this.router.url]);
    // this.pacienteService.setFormPropMascota('Ocultar');

    this.afiliadoService.edittabContrato(OCULTAR);

    this.pacienteService.editformPropMascota(OCULTAR);
    this.pacienteService.editFormTablaDuenos(OCULTAR);
    this.pacienteService.editFormMascocta(OCULTAR);
    this.pacienteService.editFormTablaMasc(OCULTAR);
    this.pacienteService.editFormAnamnesico(OCULTAR);
    this.pacienteService.editFormExaClinico(OCULTAR);
    this.pacienteService.updateFormBuscaPropObserv(VISUALIZAR);
    this.pacienteService.editTabAnamnesico(OCULTAR) ;


    this.afiliadoService.tabContratoObserv.subscribe(x => {
        this.tabContrato = x;
    })

    this.pacienteService.castFPropietMascota.subscribe(x => {
      this.formPropMascota = x;
    })


    this.pacienteService.formTablaDuenosObserv.subscribe(x => { this.formTablaDuenos = x; })
    this.pacienteService.formAnamnesicoObserv.subscribe(x => { this.formAnamnesico = x; })
    this.pacienteService.formMascoctaObserv.subscribe(x => { this.formMascocta = x; })
    this.pacienteService.formTablaMascObserv.subscribe(x => { this.formTablaMasc = x; })
    this.pacienteService.formAnamnesicoObserv.subscribe(x => { this.formAnamnesico = x; })
    this.pacienteService.formExaClinicoObserv.subscribe(x => { this.formExaClinico = x; })
    this.pacienteService.formBuscaPropObserv.subscribe(x => { this.formBuscaProp= x; })
    this.pacienteService.formTabAnamnesicoObserv.subscribe(x => { this.tabAnamnesico= x; })



    this.amplifyService.subscribe((data: any) => {
      if (data.authStatus === "authenticated") {
        this.router.navigate(['/menu']);
      };
    })
  }

  async ngOnInit(): Promise<void> {





    let session = await this.authService.getCurrentSession();
    console.log(session);
    console.log(session?.idToken?.payload);

    // this.fullName = this.authService.getCurrentUserFullName()  ;


    console.log('this.authService.getCurrentUserFullName() ', this.authService.getCurrentUserFullName());
    this.authService.getCurrentUserFullName().then(x => {
      console.log('esto es lo único que hay :: ', x);

    })




    console.log('fullName ...', this.fullName);

    console.log('codigoVeterinaria --- ', session?.idToken?.payload['custom:codigoVeterinaria']?.toString());
    this.idVeterinaria = session?.idToken?.payload['custom:codigoVeterinaria']?.toString();

    this.email = session?.idToken?.payload['email']?.toString();
    console.log('email :: ', this.email);


    this.pacienteService.setIdVeterinaria(this.idVeterinaria ?? "");


    // this.router.navigate(['menu']);

    // cognitoToken?.idToken?.payload['name']?.toString();


    // this.texto = session?.idToken?.payload.aud?.toString;
    // this.texto = session?.idToken?.payload.aud?.toString;


    // throw new Error('Method not implemented.');
  }



  title = 'veterinaria00';
  formFields = {
    signUp: {
      name: {
        order: 1
      },
      email: {
        order: 2
      },
      password: {
        order: 5
      },
      confirm_password: {
        order: 6
      }
    },
  };


  verFormPropMascota() {
    console.log('xxxxx  ---> ');
    this.pacienteService.ocultarPartes();
    this.pacienteService.updateFormBuscaPropObserv(VISUALIZAR);
// aaaaa

    // this.pacienteService.editformPropMascota(VISUALIZAR);
    // this.pacienteService.castFPropietMascota.subscribe(x => {
      // this.formPropMascota = x;
      // console.log('esta es la xxxxxxxxx ', x);
    // })
  }


}
