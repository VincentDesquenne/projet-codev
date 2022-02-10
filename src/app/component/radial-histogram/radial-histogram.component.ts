import {Component, Input, OnInit} from '@angular/core';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {StatsService} from '../../service/stats.service';


interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-radial-histogram',
  templateUrl: './radial-histogram.component.html',
  styleUrls: ['./radial-histogram.component.scss']
})
export class RadialHistogramComponent implements OnInit {

  @Input('id') id: string


  year: number = 1990;

  yearTab: number[] = [
   1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018]


  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.changeYear()
  }

  changeYear(){
    const e = document.getElementById('mySelect') as HTMLSelectElement
    this.year = parseInt(e.options[e.selectedIndex].value)
    this.statsService.getStatsHistoriqueCategorieAnnee(this.id, this.year).subscribe(
      (stats) => {
        let statistiques = []
        for(let i=0; i<Object.keys(stats).length; i++){
          statistiques.push({
            category: stats[i][0],
            value: stats[i][1].value,
          })
        }
        // Themes begin
        am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
        let chart = am4core.create("chartdivRadial", am4charts.RadarChart);
        chart.scrollbarX = new am4core.Scrollbar();


        chart.data = statistiques;
        chart.radius = am4core.percent(100);
        chart.innerRadius = am4core.percent(50);
// Create axes
        // @ts-ignore
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        // @ts-ignore
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.tooltip.disabled = true;
        categoryAxis.renderer.minHeight = 110;
        categoryAxis.renderer.grid.template.disabled = true;
//categoryAxis.renderer.labels.template.disabled = true;
        let labelTemplate = categoryAxis.renderer.labels.template;
        labelTemplate.radius = am4core.percent(-60);
        labelTemplate.location = 0.5;
        labelTemplate.relativeRotation = 90;

        // @ts-ignore
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.disabled = true;
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.tooltip.disabled = true;


// Create series
        let series = chart.series.push(new am4charts.RadarColumnSeries());
        series.sequencedInterpolation = true;
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "category";
        series.columns.template.strokeWidth = 0;
        series.tooltipText = "{valueY}";
        series.columns.template.radarColumn.cornerRadius = 10;
        series.columns.template.radarColumn.innerCornerRadius = 0;

        series.tooltip.pointerOrientation = "vertical";

// on hover, make corner radiuses bigger
        let hoverState = series.columns.template.radarColumn.states.create("hover");
        hoverState.properties.cornerRadius = 0;
        hoverState.properties.fillOpacity = 1;



        series.columns.template.adapter.add("fill", function(fill, target) {
          return chart.colors.getIndex(target.dataItem.index);
        })

// Cursor
        chart.cursor = new am4charts.RadarCursor();
        chart.cursor.innerRadius = am4core.percent(50);
        chart.cursor.lineY.disabled = true;
      }
    )
  }

}
