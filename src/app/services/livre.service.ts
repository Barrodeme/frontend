import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Livre } from '../model/livre';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  bakend_url =  environment.bakend_url;// l'url est decricre dans le fichier environment.ts
  constructor(
    private httppClient: HttpClient// pour emettre des requetes externes http ou https
  ) { }

  createLivre(livre: Livre, auteur_id: bigint): Observable<Object>{
    return this.httppClient.post(`${this.bakend_url+"auteurs"}/${auteur_id+"/livres"}`, livre);
  }

   getListLivre(): Observable<Livre[]>{
     return this.httppClient.get<Livre[]>(`${this.bakend_url+"livres"}`);
   }


   getLivreById(id: number): Observable<Livre>{
    return this.httppClient.get<Livre>(`${this.bakend_url+"livres"}/${id}`);
  }


  updateLivre(id: number, livre: Livre): Observable<Object>{
    return this.httppClient.put(`${this.bakend_url}/${id+"livres"}`, livre);
  }

 deleteLivre(id: number): Observable<Object>{
     return this.httppClient.delete(`${this.bakend_url+"livres"}/${id}`);
   }
}
