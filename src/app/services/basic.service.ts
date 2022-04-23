import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicService {
  // recuperation de la valeur status sur le stockage du  navigateur
  getStatusAuthUser() {
    let status = localStorage.getItem('status')
    return (status !== null) ? true : false;
  }
  // creation de la valeur status dans le stockage du  navigateur
  setStatusAuthUser(value) {
    localStorage.setItem('status',value)
  }

  // suppression  de la valeur status dans le stockage du  navigateur
  removeStatusAuthUser(value: any) {
    localStorage.removeItem('status')
  }
}
