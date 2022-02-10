import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import getCountryISO3 from 'country-iso-2-to-3';
// @ts-ignore
import countries from 'i18n-iso-countries';
// @ts-ignore
import i18n_iso_countries from 'i18n-iso-countries/langs/fr.json';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  carte: string;
  monPays: string;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.carte = "active"
    this.monPays = "";
  }

  deconnexion(): void {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("pays")
  }

  navToMyCountry() {
    this.carte = "";
    this.monPays = "active";
    this.route.navigate(['/historique/' + getCountryISO3(localStorage.getItem('pays')) + '/' + countries.getName(localStorage.getItem('pays'), 'fr')])
  }

}
