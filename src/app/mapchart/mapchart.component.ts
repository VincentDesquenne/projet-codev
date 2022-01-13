import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import {Stats} from '../stats/stats';

@Component({
  selector: 'app-mapchart',
  templateUrl: './mapchart.component.html',
  styleUrls: ['./mapchart.component.scss']
})
export class MapchartComponent {

  private chart: am4charts.XYChart;
  private stats: Stats[] = [
    {
      id:"FR",
      qualiteAir: 50,
    },
    {
      id:"ES",
      qualiteAir:25
    }
  ]

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {}

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

      chart.geodata = am4geodata_worldLow;

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

// Configure series
      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.id = "{id}";
      polygonTemplate.tooltipText = "{name} " + polygonTemplate.id + this.stats.find(stats => stats.id === "ES").qualiteAir;
      polygonTemplate.fill = am4core.color("#C5E6A6");
      polygonTemplate.stroke = am4core.color("#BDD2A6");
      polygonTemplate.strokeWidth = 0.5;

      let graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
      graticuleSeries.mapLines.template.line.stroke = am4core.color("#B9BEA5");
      graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
      graticuleSeries.fitExtent = false;


      chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
      chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#9899a6");

// Create hover state and set alternative fill color
      let hs = polygonTemplate.states.create("hover");
      console.log(hs);
      hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

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

    });
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
