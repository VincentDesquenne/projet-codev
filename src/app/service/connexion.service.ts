import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Utilisateur} from '../model/utilisateur';


const    ENDPOINT = environment.endpoint;

@Injectable()
export class ConnexionService {


  private headers = new Headers( {'content-type' : 'application/json'} );



  private ClientUrl : string;


  constructor(private httpClient : HttpClient) {

    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });
  }


  getLogin(unUti : Utilisateur) : Observable<any>
  {

    this.ClientUrl= ENDPOINT + 'authentification/login';
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };


    return this.httpClient.post<Utilisateur>(this.ClientUrl,JSON.stringify(unUti), options);

  }

  inscription(user: Utilisateur): Observable<any> {
    this.ClientUrl = ENDPOINT + 'authentification/ajout';
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };

    return this.httpClient.post<Utilisateur>(this.ClientUrl, JSON.stringify(user), options);
  }


  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err =  JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(error.message || error);
  }




}
