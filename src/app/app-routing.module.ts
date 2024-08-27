import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HistoriaComponent } from './historia/historia.component';
import { AppComponent } from './app.component';

const routes: Routes = [
{ path:'menu', component: MenuComponent   },
{ path:'historia', component: HistoriaComponent },
//{ path:'', component: AppComponent, redirectTo:'/', pathMatch:'full' },
//{ path:'**', component: AppComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
