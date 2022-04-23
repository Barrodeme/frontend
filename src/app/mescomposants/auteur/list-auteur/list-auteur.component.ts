import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auteur } from 'src/app/model/auteur';
import { AuteurService } from 'src/app/services/auteur.service';
import { KeycloakService } from 'src/app/services/keycloak.service';

@Component({
  selector: 'app-list-auteur',
  templateUrl: './list-auteur.component.html',
  styleUrls: ['./list-auteur.component.scss']
})
export class ListAuteurComponent implements OnInit {

  public listAuteurs: Auteur[];//permet de recuperer la liste des auteurs
  public message="";// message
  public show = false;// cacher ou afficher l'alerte

  constructor(
    private auteurService: AuteurService,// declaration de l'objet AuteurService
    private router: Router,
    private kcService: KeycloakService// service keycloak
  ) { }

  ngOnInit() {
    this.getListAuteur();// appel du service getList dans AuteurService
  }

  getListAuteur() {
    this.auteurService.getListAuteur().subscribe(
      data => this.showList(data)
    )
  }
  showList(data: any): void {
    this.listAuteurs = (data)
  }

  auteurDetails(id: number){
    this.router.navigate(['show-auteur', id]);
  }

  editauteur(id: number){
    this.router.navigate(['edit-auteur', id]);
  }

   deleteauteur(id: number){
     this.auteurService.deleteAuteur(id).subscribe( (data: any) => {
       this.show = true;// afficher alerte
       this.message = " auteur supprimé avec succes!";
       this.getListAuteur();
     })
   }
   close(){
     this.show =!this.show;
   }
   isAdmin(){
    return this.kcService.kc.hasRealmRole('admin')
   }
}
