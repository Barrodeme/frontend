import { Component, OnInit } from '@angular/core';
import { KeycloakService} from 'src/app/services/keycloak.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

islogin: boolean;// permet de recuprerer l'etat de connexion de l'utilisateur
username: string;// pour recuperer le nom d 'utilisateur
  constructor(public kcService: KeycloakService) { }

  ngOnInit() {
    let i=0;
    this.setValueKeycloak()
      }

  // definition des variables associees a leur valeur du service keycloak
  setValueKeycloak(){
    this.islogin = this.kcService.kc.authenticated// true ou false pour l'etat de connexion

    if (this.islogin) {//verification de la connexion
     this.username= this.kcService.kc.tokenParsed.preferred_username

    }
  }

  logout(){//deconnexion
    //indication de l'url de redirection apres deconnexion
    let logoutOptions = { redirectUri : "http://localhost:4200/" }
    this.kcService.kc.logout(logoutOptions)
    localStorage.removeItem("user");// supression du nom d'utilisateur  stocke dans le navigateur une deconnecte
  }

  login(){//connexion
    this.kcService.kc.login()
  }
}
