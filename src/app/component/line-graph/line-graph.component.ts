import {Component, Input, OnInit} from '@angular/core';
import {StatsService} from '../../service/stats.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit {
  @Input('id') id: string;

  categorie : string = "Total incluant LUCF";
  categorieTab: string[] = [
    "Energie", "Processus industriels", "Changement d'affectation des terres et foresterie", "Soutes de Fiouls", "Electricite et Chaleur", "Fabrication et construction", "Transport", "Construction", "Autre combustible"];


  constructor(private statsService: StatsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.changeCategorie()
  }

  changeCategorie() {
    const e = document.getElementById('mySelect2') as HTMLSelectElement
    this.categorie = e.options[e.selectedIndex].value
    this.statsService.getStatsHistoriqueCategorie(this.id, this.categorie).subscribe(
      (stats) => {
        let statistiques = []
        for(let i=0; i<Object.keys(stats).length; i++){
          let d = new Date()
          d.setFullYear(stats[i].year)
          statistiques.push({
            date: d,
            value: stats[i].value,
          })
        }

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        let chart = am4core.create("chartdivHisto", am4charts.XYChart);

        chart.data = statistiques;
// Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        //dateAxis.dateFormatter = new am4core.DateFormatter()
        //dateAxis.dateFormatter.dateFormat = "yyyy-01-01"
        dateAxis.renderer.minGridDistance = 60;
        dateAxis.title.text = "Année"
        dateAxis.title.fontWeight = "bold";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Emissions carbone (en MtCO₂e)"
        valueAxis.title.fontWeight = "bold";

// Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.tooltipText = "{value}"

        series.tooltip.pointerOrientation = "vertical";

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.snapToSeries = series;
        chart.cursor.xAxis = dateAxis;

//chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarX = new am4core.Scrollbar();
      }
    )


  }

}
