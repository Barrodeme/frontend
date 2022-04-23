import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auteur } from '../model/auteur';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

  bakend_url =  environment.bakend_url;// l'url est decricre dans le fichier environment.ts
  constructor(
    private httppClient: HttpClient// pour emettre des requetes externes http ou https
  ) { }


  createAuteur(auteur: Auteur): Observable<Object>{
    return this.httppClient.post(`${this.bakend_url+"auteurs"}`, auteur);
  }

   getListAuteur(): Observable<Auteur[]>{
     return this.httppClient.get<Auteur[]>(`${this.bakend_url+"auteurs"}`);
   }


   getAuteurById(id: number): Observable<Auteur>{
    return this.httppClient.get<Auteur>(`${this.bakend_url+"auteurs"}/${id}`);
  }


  updateAuteur(id: number, auteur: Auteur): Observable<Object>{
    return this.httppClient.put(`${this.bakend_url}/${id+"auteurs"}`, auteur);
  }

 deleteAuteur(id: number): Observable<Object>{
     return this.httppClient.delete(`${this.bakend_url+"auteurs"}/${id}`);
   }
}
