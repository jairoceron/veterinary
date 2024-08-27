import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Amplify} from 'aws-amplify';
import { HttpClient, provideHttpClient } from '@angular/common/http';



import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { HistoriaComponent } from './historia/historia.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { TabdueComponent } from './tabdue/tabdue.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { MascotaComponent } from './mascota/mascota.component';
import { TabmascComponent } from './tabmasc/tabmasc.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';

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
    MatTooltipModule
  ],
  providers: [
    provideClientHydration(), provideHttpClient(), provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

