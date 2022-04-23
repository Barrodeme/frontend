import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livre } from 'src/app/model/Livre';
import { AuteurService } from 'src/app/services/auteur.service';
import { LivreService } from 'src/app/services/livre.service';

@Component({
  selector: 'app-show-livre',
  templateUrl: './show-livre.component.html',
  styleUrls: ['./show-livre.component.css']
})
export class ShowLivreComponent implements OnInit {

  public livre: Livre = new Livre();// auteur model
  public name_auteur: string = '';
  public titre: string = '';
  public nbpages: string ='';
  public description: string ='';


  public idLivre: number;

  public listAuteurs:any =[];//permet de recuperer la liste des auteurs

  constructor(
    private livreService: LivreService,// declaration de l'objet LivreService
    private auteurService: AuteurService,// declaration de l'objet AuteurService
    private routeAtivate: ActivatedRoute,// perment de recuperer le parametre passer a cette route presente
    private router: Router) {

    }

  ngOnInit(): void {
    this.getParameter()// cette demarre en premier une fois sur cette route presente
  }

  getParameter() {
    //recuperation de la valeur id depuis la route presente
    this.idLivre = this.routeAtivate.snapshot.params['livre'];
    this.name_auteur = this.routeAtivate.snapshot.params['auteur'];

     // ajout de l'element a modifier dans la tab depuis le service getLivreById
     this.livreService.getLivreById(this.idLivre).subscribe(data => {
      this.Response(data)

    }, error => console.log(error))

  }
  Response(data: any): void {
    let list: any = []
    this.livre = (data)
     this.titre = this.livre.titre
     this.nbpages = this.livre.nbpages
     this.description = this.livre.description

  }

  goToAuteurList(){
    this.router.navigate(['/list-livre']);
  }
}
