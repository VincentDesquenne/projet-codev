import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Stats} from './stats';


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

    this.statsUrl = ENDPOINT + 'test/test';
    return this.httpStats.get<any>(this.statsUrl, {headers: this.mesHeaders});

  }



}
