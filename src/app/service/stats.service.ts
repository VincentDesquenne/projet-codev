import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Stats} from '../model/stats';


const ENDPOINT = environment.endpoint;


@Injectable()
export class StatsService {


  private statsUrl: string;
  private mesHeaders: HttpHeaders;

  constructor(private httpStats: HttpClient) {

    const token = localStorage.getItem('token');

    this.mesHeaders = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Cache-Control', 'no-cache')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + token);
  }

  getStatsListe(): Observable<any> {

    this.statsUrl = ENDPOINT + 'getApi/getMap';
    return this.httpStats.get<any>(this.statsUrl, {headers: this.mesHeaders});

  }

  getStatsHistorique(id: string): Observable<any> {

    this.statsUrl = ENDPOINT + 'getApi/getHistorique/' + id;
    return this.httpStats.get<any>(this.statsUrl, {headers: this.mesHeaders});

  }

  getStatsHistoriqueCategorieAnnee(id: string, year: number): Observable<any> {

    this.statsUrl = ENDPOINT + 'getApi/getHistoriqueByAnnee/' + id + '/' + year;
    return this.httpStats.get<any>(this.statsUrl, {headers: this.mesHeaders});

  }

  getClassement(): Observable<any> {
    this.statsUrl = ENDPOINT + 'getApi/getClassement';
    return this.httpStats.get<any>(this.statsUrl, {headers: this.mesHeaders});
  }

  getStatsHistoriqueCategorie(id: string, categorie: string): Observable<any> {

    this.statsUrl = ENDPOINT + 'getApi/getHistoriqueByCategorie/' + id + '/' + categorie;
    return this.httpStats.get<any>(this.statsUrl, {headers: this.mesHeaders});

  }

  getPays(): Observable<any> {
    this.statsUrl = ENDPOINT + 'getApi/getPays';
    return this.httpStats.get<any>(this.statsUrl, {headers: this.mesHeaders});

  }





}
