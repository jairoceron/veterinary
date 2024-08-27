import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { PacienteService } from './service/paciente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {



  constructor(private authService: AuthService, private router: Router, private amplifyService: AuthenticatorService,
    private pacienteService: PacienteService

  ) {
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

    let fullName = this.authService.getCurrentUserFullName();
    console.log('fullName ...', fullName);

    console.log('codigoVeterinaria --- ', session?.idToken?.payload['custom:codigoVeterinaria']?.toString());
    let idVeterinaria: string | undefined = session?.idToken?.payload['custom:codigoVeterinaria']?.toString();
    this.pacienteService.setIdVeterinaria(idVeterinaria ?? "");


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


}
