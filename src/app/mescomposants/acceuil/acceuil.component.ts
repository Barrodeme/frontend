import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {
  islogin: boolean;

  constructor(private kcService: KeycloakService) { }

  ngOnInit() {
    this.setValueKeycloak()
  }

  setValueKeycloak(){
    this.islogin = this.kcService.kc.authenticated
  }
  login(){
    this.kcService.kc.login()
  }
}
