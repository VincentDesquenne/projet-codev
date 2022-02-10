import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapchartComponent } from './component/mapchart/mapchart.component';
import {StatsService} from './service/stats.service';
import {HttpClientModule} from '@angular/common/http';
import { HistoriqueComponent } from './component/historique/historique.component';
import { LineGraphComponent } from './component/line-graph/line-graph.component';
import { RadialHistogramComponent } from './component/radial-histogram/radial-histogram.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ClassementComponent } from './component/classement/classement.component';
import {MatTableModule} from '@angular/material/table';
import {AccueilComponent} from './component/accueil/accueil.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import {ConnexionService} from './service/connexion.service';
import {MatSelectCountryModule} from '@angular-material-extensions/select-country';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    MapchartComponent,
    HistoriqueComponent,
    LineGraphComponent,
    RadialHistogramComponent,
    ClassementComponent,
    AccueilComponent,
    NavbarComponent,
    ConnexionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSelectCountryModule.forRoot('fr'),
    MatInputModule

  ],
  providers: [StatsService, ConnexionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
