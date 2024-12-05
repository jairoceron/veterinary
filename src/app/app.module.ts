import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Amplify } from 'aws-amplify';
import { HttpClient, provideHttpClient } from '@angular/common/http';



import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { HistoriaComponent } from './historia/historia.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { TabdueComponent } from './tabdue/tabdue.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MascotaComponent } from './mascota/mascota.component';
import { TabmascComponent } from './tabmasc/tabmasc.component';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatTooltipModule } from '@angular/material/tooltip';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DialogconfComponent } from './dialogconf/dialogconf.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AnamnesicoComponent } from './anamnesico/anamnesico.component';
import { ExamenclinicoComponent } from './examenclinico/examenclinico.component';
import { PropmascotaComponent } from './propmascota/propmascota.component';
import { BuscpropmascotaComponent } from './buscpropmascota/buscpropmascota.component';
import { DialogMascotaComponent } from './dialog-mascota/dialog-mascota.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TabanamnesicoComponent } from './tabanamnesico/tabanamnesico.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from "@angular/material/form-field";
// import {MatInputModule} from '@angular/material/input';
 import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AfiliadoComponent } from './afiliado/afiliado.component';
import { TafiliadoComponent } from './tafiliado/tafiliado.component';
// import {MatBadgeModule} from '@angular/material/badge';


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_EXKe4cwrd',
      userPoolClientId: '8k16d25tavt4l41c641uva0cv'
    }
  }
});


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HistoriaComponent,
    TabdueComponent,
    MascotaComponent,
    TabmascComponent,
    FileUploadComponent,
    DialogconfComponent,
    AnamnesicoComponent,
    ExamenclinicoComponent,
    PropmascotaComponent,
    BuscpropmascotaComponent,
    DialogMascotaComponent,
    TabanamnesicoComponent,
    AfiliadoComponent,
    TafiliadoComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, AmplifyAuthenticatorModule,
    NgbModule, FontAwesomeModule,
    FormsModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSlideToggleModule,
    
    
  ],
  providers: [
    provideClientHydration(), provideHttpClient(), provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

