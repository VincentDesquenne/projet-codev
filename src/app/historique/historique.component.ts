import { Component, OnInit } from '@angular/core';
import {StatsService} from '../stats/stats.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  id: string;
  name: string;

    constructor(private statsService: StatsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("pays");
    this.name = this.route.snapshot.paramMap.get("name");
    this.statsService.getStatsHistorique(this.id).subscribe(
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
        console.log(statistiques)

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

  back(){
    this.router.navigate(['/accueil']);
  }

}
