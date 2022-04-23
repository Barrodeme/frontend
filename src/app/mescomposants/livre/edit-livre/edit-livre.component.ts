import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livre } from 'src/app/model/Livre';
import { AuteurService } from 'src/app/services/auteur.service';
import { LivreService } from 'src/app/services/livre.service';

@Component({
  selector: 'app-edit-livre',
  templateUrl: './edit-livre.component.html',
  styleUrls: ['./edit-livre.component.css']
})
export class EditLivreComponent implements OnInit {
  form ! : FormGroup; //pour controler la validation du formulaire

  public livre: Livre = new Livre();// auteur model
  public name_auteur: string = '';
  public titre: string = '';
  public nbpages: string ='';
  public description: string ='';


  public idLivre: number;

  public listAuteurs:any =[];//permet de recuperer la liste des auteurs

  constructor(
    private livreService: LivreService,// declaration de l'objet LivreService
    private fb: FormBuilder,// permet de gerer les differents elements d'un formulaire
    private auteurService: AuteurService,// declaration de l'objet AuteurService
    private routeAtivate: ActivatedRoute,// perment de recuperer le parametre passer a cette route presente
    private router: Router) {

    }

  ngOnInit(): void {
    this.getListAuteur();// appel du service getList dans AuteurService
    this.getParameter()// cette demarre en premier une fois sur cette route presente
    this.createForm()// permet de charger les regles de gestion du formulaire
  }

  //creation du formulaire
  createForm(){
    this.form = this.fb.group({
      titre:['',Validators.required],// les regles de validation de ce champ
      nbpages:['',Validators.required],// les regles de validation de ce champ
      description:['',Validators.required],// les regles de validation de ce champ
      // chargons la liste des auteurs par defaut
      auteur_id:[this.listAuteurs,Validators.required],// les regles de validation de ce champ
    });
  }

  getListAuteur() {
    this.auteurService.getListAuteur().subscribe(
      (data: any) => { this.listAuteurs = (data)}
    )
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
    this.livre = (data);
     this.titre = this.livre.titre
     this.nbpages = this.livre.nbpages
     this.description = this.livre.description

    this.form.get("titre").setValue(this.titre);
    this.form.get("nbpages").setValue(this.nbpages);
    this.form.get("description").setValue(this.description);
  }

  goToAuteurList(){
    this.router.navigate(['/list-livre']);
  }

  sendForm(){
    this.livre.titre = this.form.value.titre
    this.livre.nbpages = this.form.value.nbpages
    this.livre.description = this.form.value.description
    this.livre.auteur_id = this.form.value.auteur_id
    this.update(this.livre,this.livre.auteur_id);
  }
  update(livre: Livre,id: bigint){
    this.livreService.createLivre(this.livre,id).subscribe( data =>{
      this.goToAuteurList()
    });
  }
}
