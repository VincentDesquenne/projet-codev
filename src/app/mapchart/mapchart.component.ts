import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_lang_FR from "@amcharts/amcharts4-geodata/lang/FR";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import {Stats} from '../stats/stats';
import {StatsService} from '../stats/stats.service';
import {Color} from '@amcharts/amcharts4/core';

import getCountryISO3 from 'country-iso-2-to-3';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mapchart',
  templateUrl: './mapchart.component.html',
  styleUrls: ['./mapchart.component.scss']
})
export class MapchartComponent {

  private chart: am4charts.XYChart;
  public idPays: string
  /*private stats: Stats[] = [
    {
      id:"FR",
      aqi: "50",
    },
    {
      id:"ES",
      aqi:"25"
    }
  ]*/

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private statsService: StatsService, private router: Router) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      let chart = am4core.create("chartdiv", am4maps.MapChart);
      this.statsService.getStatsListe().subscribe((stats) => {
        let qualite = []
        let idTab = []
        let idPays = ""
        let couleurTab = {}
        for(let i=0; i<Object.keys(stats).length; i++){

          idTab.push(stats[i][0]);

          qualite.push({
            "id": stats[i][0],
            "pm10": stats[i][1],
            "o3": stats[i][2],
            "no2": stats[i][3],
            "so2": stats[i][4],
            "aqi": stats[i][5],
            "fill": am4core.color("#" + stats[i][6])

          })

          couleurTab[stats[i][0]] = "#" + stats[i][6]


        }
          chart.geodata = am4geodata_worldLow;
          chart.geodataNames = am4geodata_lang_FR;
          chart.projection = new am4maps.projections.Orthographic();
          chart.panBehavior = "rotateLongLat";
          chart.deltaLatitude = -20;
          chart.background.fill = am4core.color("#a4a4a4")
          chart.padding(20,20,20,20);


// limits vertical rotation
          chart.adapter.add("deltaLatitude", function(delatLatitude){
            return am4core.math.fitToRange(delatLatitude, -90, 90);
          })

// Create map polygon series
          let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
          polygonSeries.useGeodata = true;

          var includedCountries = [];
          qualite.forEach((function(country){
            includedCountries.push(country.id);
          }))
        console.log(qualite)
          polygonSeries.include = includedCountries;
          polygonSeries.setStateOnChildren = true;
          polygonSeries.calculateVisualCenter = true;

// Configure series
          let polygonTemplate = polygonSeries.mapPolygons.template;
          polygonTemplate.id = "{id}";
          //polygonTemplate.tooltipText = "{name} avec une qualité de l'air de {qualiteAir}";
          polygonTemplate.tooltipPosition = "fixed";

          polygonTemplate.tooltipHTML =  `<div style="background-color: {codeCouleur}"><center><strong>{name}</strong></center>
      <hr />
      <table>
      <tr>
        <th align="left">AQI</th>
        <td>{aqi}</td>
      </tr>
      <tr>
        <th align="left">PM10</th>
        <td>{pm10} µg/m<sup>3</sup></td>
      </tr>
        <tr>
        <th align="left">O<sub>3</sub></th>
        <td>{o3} µg/m<sup>3</sup></td>
      </tr>
      <tr>
        <th align="left">NO<sub>2</sub></th>
        <td>{no2} µg/m<sup>3</sup></td>
      </tr>
      <tr>
        <th align="left">SO<sub>2</sub></th>
        <td>{so2} µg/m<sup>3</sup></td>
      </tr>

        <td></td>
        </table>
            </div>`;



          polygonTemplate.fill = am4core.color("#FFFFFF");


          polygonTemplate.stroke = am4core.color("#000000");
          polygonTemplate.strokeWidth = 0.5;

          // @ts-ignore
          polygonTemplate.events.on("hit", event =>  {
            //event.target.series.chart.zoomToMapObject(event.target);

            // @ts-ignore
              this.historiquePays(getCountryISO3(event.target.dataItem.dataContext.id), event.target.dataItem.dataContext.name)

          }
          );


          polygonSeries.data = JSON.parse(JSON.stringify(qualite));
          /*let graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
          graticuleSeries.mapLines.template.line.stroke = am4core.color("#B9BEA5");
          graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
          graticuleSeries.fitExtent = false;*/


          let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
          let worldSeriesName = "world";
          worldSeries.name = worldSeriesName;
          worldSeries.useGeodata = true;
          worldSeries.exclude = includedCountries;
          worldSeries.fillOpacity = 0.8;
          worldSeries.hiddenInLegend = true;
          worldSeries.mapPolygons.template.nonScalingStroke = true;

          chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
          chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#9899a6");

// Create hover state and set alternative fill color
          let hs = polygonTemplate.states.create("hover");
          console.log(hs);
          //hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

          console.log(polygonSeries);

          let animation;
          setTimeout(function(){
            animation = chart.animate({property:"deltaLongitude", to:100000}, 20000000);
          }, 3000)

          chart.seriesContainer.events.on("down", function(){
            if(animation){
              animation.stop();
            }
          })


        }
      )
    });/*
      })
      Promise.all([new Promise((resolve, reject) => {
        this.statsService.getStatsListe().subscribe(
          (stats) => {
            console.log(stats[0][1]);

          resolve(stats)});

      })]).then( () => {*/








  }



  public historiquePays(id: string, name: string){
    this.router.navigate(['/historique/' + id + '/' + name])
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
