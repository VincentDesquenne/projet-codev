import { Component, OnInit } from '@angular/core';
import {StatsService} from '../stats/stats.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.scss']
})
export class ClassementComponent implements OnInit {
  displayedColumns: string[] = ['position', 'pays', 'aqi'];
  classementBest = [];
  classementBad = [];
  constructor(private statsService: StatsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.statsService.getClassement().subscribe(
      (classement) => {
        let classTampon = []
        let classTampon2 = []
        let compteur = 1;
        for (let i = 0; i < 6; i = i + 2) {
          classTampon.push({
            position: compteur,
            pays: classement[i],
            aqi: classement[i + 1],
          })
          compteur++;

        }
        compteur = 1;
        for (let i = 6; i < 12; i = i + 2) {
          classTampon2.push({
            position: compteur,
            pays: classement[i ],
            aqi: classement[i + 1],
          })
          compteur++;
        }
        this.classementBad = classTampon2;
        this.classementBest = classTampon;

      }
    )
  }

}
