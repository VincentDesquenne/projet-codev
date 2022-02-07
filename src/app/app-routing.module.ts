import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapchartComponent} from './mapchart/mapchart.component';
import {HistoriqueComponent} from './historique/historique.component';

const routes: Routes = [

  { path: '', redirectTo : '/map', pathMatch: 'full'  },
  { path: 'map', component: MapchartComponent },
  { path: 'historique/:pays/:name', component: HistoriqueComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
