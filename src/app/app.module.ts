import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapchartComponent } from './mapchart/mapchart.component';
import {StatsService} from './stats/stats.service';
import {HttpClientModule} from '@angular/common/http';
import { HistoriqueComponent } from './historique/historique.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { RadialHistogramComponent } from './radial-histogram/radial-histogram.component';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MapchartComponent,
    HistoriqueComponent,
    LineGraphComponent,
    RadialHistogramComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  providers: [StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
