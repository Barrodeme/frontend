import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auteur } from 'src/app/model/auteur';
import { AuteurService } from 'src/app/services/auteur.service';

@Component({
  selector: 'app-edit-auteur',
  templateUrl: './show-auteur.component.html',
  styleUrls: ['./show-auteur.component.css']
})
export class ShowAuteurComponent implements OnInit {

  public auteur: Auteur = new Auteur();// auteur model
  public name_auteur: string = '';
  public maisonedition: string = '';
  public idAuteur: number;


  constructor(private auteurService: AuteurService,
    private routeAtivate: ActivatedRoute,// perment de recuperer le parametre passer a cette route presente
    private router: Router) {

    }

  ngOnInit(): void {
    this.getParameter()// cette demarre en premier une fois sur cette route presente
  }



  getParameter() {
    //recuperation de la valeur id depuis la route presente
    this.idAuteur = this.routeAtivate.snapshot.params['auteur'];

     // ajout de l'element a modifier dans la tab depuis le service getAuteurByid
     this.auteurService.getAuteurById(this.idAuteur).subscribe(data => {
      this.Response(data)

    }, error => console.log(error))

  }
  Response(data: any): void {
    this.auteur = (data)
  }

  back(){
    this.router.navigate(['/list-auteurs']);
  }
}
