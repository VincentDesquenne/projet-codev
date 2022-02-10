import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Utilisateur} from '../../model/utilisateur';
import {ConnexionService} from '../../service/connexion.service';
import {StatsService} from '../../service/stats.service';
// @ts-ignore
import countries from 'i18n-iso-countries';
// @ts-ignore
import i18n_iso_countries from 'i18n-iso-countries/langs/fr.json';

countries.registerLocale(i18n_iso_countries);
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  containerStyle: any;
  private errorMessage: string = '';
  private reponse : Response;
  loginForm : FormGroup;
  connexionForm: FormGroup;
  paysList: string[] = [];

  constructor(private unCS: ConnexionService, private router: Router, private statsService: StatsService) { }

  nomControl: FormControl = new FormControl('', Validators.required);
  paysControl: FormControl = new FormControl('', Validators.required);
  mdpControl: FormControl = new FormControl('', Validators.required);
  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  nomUtilControl: FormControl = new FormControl('', Validators.required);
  motPasseControl: FormControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.containerStyle = 'container';
    this.statsService.getPays().subscribe((pays) => {
      pays.forEach(p => this.paysList.push(countries.getName(p, "fr")))
    })
    this.loginForm = new FormGroup({
      nom: this.nomControl,
      pays: this.paysControl,
      mdp: this.mdpControl,
      email: this.emailControl,
    });
    this.connexionForm = new FormGroup({
      nomUtil: this.nomUtilControl,
      motPasse: this.motPasseControl
    })
  }

  signIn(): void {
    this.containerStyle = "container";
  }

  signUp(): void {
    this.containerStyle = "container right-panel-active";
  }

  valider(): void {

    let pwdmd5: string;
    let unUt: Utilisateur;

    unUt = new Utilisateur();
    unUt.motPasse = this.motPasseControl.value;
    unUt.nomUtil = this.nomUtilControl.value;
    this.unCS.getLogin(unUt).subscribe(
      reponse  => {
        window.localStorage.setItem('user', reponse.email);
        window.localStorage.setItem('pays', reponse.pays);

        this.router.navigate(['/accueil']);

      },
      err => {
        this.errorMessage = err.error.message;
        console.log('Erreur');
        alert('Erreur d\'appel!' + this.errorMessage);
      }
    );
  }

  inscription(): void {

    let pwdmd5: string;
    let unUt: Utilisateur;

    unUt = new Utilisateur();
    if(this.emailControl.value !== "" && this.nomControl.value !== "" && this.mdpControl.value !== ""){
      unUt.email = this.emailControl.value;
      unUt.surname = this.nomControl.value;
      unUt.pays = countries.getAlpha2Code(this.paysControl.value, 'fr');
      unUt.mdp = this.mdpControl.value;
      this.unCS.inscription(unUt).subscribe(
        reponse  => {
          alert('Inscription réussie !!!');
          window.localStorage.setItem('user', unUt.email);
          window.localStorage.setItem('pays', unUt.pays);
          this.router.navigate(['/accueil']);

        },
        err => {
          this.errorMessage = err.error.message;
          console.log("Erreur");
          alert('Erreur d\'appel!' + this.errorMessage);
        }
      );
    } else {
      alert('Certains champs ne sont pas complétés');
    }

  }


}
