import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapchartComponent } from './mapchart/mapchart.component';
import {StatsService} from './stats/stats.service';
import {HttpClientModule} from '@angular/common/http';
import { HistoriqueComponent } from './historique/historique.component';

@NgModule({
  declarations: [
    AppComponent,
    MapchartComponent,
    HistoriqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
