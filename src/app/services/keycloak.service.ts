import { Injectable } from '@angular/core';
import * as Keycloak from 'keycloak-js';


@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  public kc: any;// pour la gestion de keycloak

  constructor() { }

  public init() {
    return new Promise((resolve, reject) => {
      //parametrage du keycloak
      this.kc = Keycloak({
        realm: 'barro',// gestionnaire principal des applications de Barro
        url: 'http://localhost:8081/',//url du serveur keycloak
        clientId: "angular-keycloak",//identifiant de l'application
      },
      );
      this.kc.init({
        onLoad: 'check-sso',// pour le appli necessitant pas une authentification avant tout
        promiseType: 'native',// previent les eventuels probleme javascript
      })
        .then((authenticated) => {
          resolve({auth:authenticated, token: this.kc.token})
        }).catch(err => {
          reject(err)
        })
    })
  }
}
