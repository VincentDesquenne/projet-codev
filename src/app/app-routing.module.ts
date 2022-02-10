import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapchartComponent} from './component/mapchart/mapchart.component';
import {HistoriqueComponent} from './component/historique/historique.component';
import {ClassementComponent} from './component/classement/classement.component';
import {AccueilComponent} from './component/accueil/accueil.component';
import {ConnexionComponent} from './component/connexion/connexion.component';

const routes: Routes = [

  { path: '', redirectTo : '/connexion', pathMatch: 'full'  },
  { path: 'connexion', component: ConnexionComponent},
  { path: 'accueil', component: AccueilComponent },
  { path: 'map', component: MapchartComponent },
  { path: 'historique/:pays/:name', component: HistoriqueComponent},
  { path: 'test', component: ClassementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
