import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuteurService } from 'src/app/services/auteur.service';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { LivreService } from 'src/app/services/livre.service';

@Component({
  selector: 'app-list-livre',
  templateUrl: './list-livre.component.html',
  styleUrls: ['./list-livre.component.scss']
})
export class ListLivreComponent implements OnInit {

  public listLivres: any[] = [];//permet de recuperer la liste des livre
  public message = "";// message
  public show = false;// cacher ou afficher l'alerte

  constructor(
    private livreService: LivreService,// declaration de l'objet LivreService
    private auteurService: AuteurService,// declaration de l'objet AuteurService
    private router: Router,// pour passer d'une route a une autre route
    private kcService: KeycloakService// service keycloak
  ) { }

  ngOnInit() {
    this.getListLivres();// appel du service getList dans livreService
  }


  getListLivres() {
    this.livreService.getListLivre().subscribe((data: any) => {
      this.filtrerList(data)
    })
  }

  filtrerList(data: any) {
    /* structure de la reponse
    *[
      {
        "id": 1,
        "name": "auteur1",
        "maisonedition": "barrode2",
        "livreModels": [
            {
                "id": 2,
                "titre": "livre2",
                "nbpages": "25",
                "description": "descrire moi"
            }
            {
                "id": 2,
                "titre": "livre2",
                "nbpages": "25",
                "description": "descrire moi"
            }
        ]
    }
    ]
    */
     this.listLivres = (data)


  }
  showList(data: any): void {
    this.listLivres = JSON.parse(data)
  }

  livreDetails(id: number, auteur_name: string) {
    this.router.navigate(['show-livre', id,auteur_name]);
  }

  editlivre(id: number, auteur_name: string) {
    this.router.navigate(['edit-livre', id,auteur_name]);
  }

  deletelivre(id: number) {
    this.livreService.deleteLivre(id).subscribe((data: any) => {
      this.show = true;// afficher alerte
      this.message = " livre supprimé avec succes!";
      this.getListLivres();
    })
  }
  close() {
    this.show = !this.show;
  }
  isAdmin(){
    return this.kcService.kc.hasRealmRole('admin')
   }
}
