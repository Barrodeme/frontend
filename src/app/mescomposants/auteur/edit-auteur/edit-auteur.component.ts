import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auteur } from 'src/app/model/auteur';
import { AuteurService } from 'src/app/services/auteur.service';

@Component({
  selector: 'app-edit-auteur',
  templateUrl: './edit-auteur.component.html',
  styleUrls: ['./edit-auteur.component.css']
})
export class EditAuteurComponent implements OnInit {
  form ! : FormGroup; //pour controler la validation du formulaire

  public auteur: Auteur = new Auteur();// auteur model
  public name_auteur: string = '';
  public maisonedition: string = '';
  public idAuteur: number;


  constructor(private auteurService: AuteurService,
    private fb: FormBuilder,// permet de gerer les differents elements d'un formulaire
    private routeAtivate: ActivatedRoute,// perment de recuperer le parametre passer a cette route presente
    private router: Router) {

    }

  ngOnInit(): void {
    this.getParameter()// cette demarre en premier une fois sur cette route presente
    this.createForm()// permet de charger les regles de gestion du formulaire
  }

  //creation du formulaire
  createForm(){
    this.form = this.fb.group({
      name:['',Validators.required],// les regles de validation de ce champ
      maisonedition:['',Validators.required],// les regles de validation de ce champ
    });
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
    this.auteur = data
    //update form value
    this.form.get("name").setValue(this.auteur.name);
    this.form.get("maisonedition").setValue(this.auteur.name);
  }

  goToAuteurList(){
    this.router.navigate(['/list-auteurs']);
  }

  sendForm(){
    this.auteur.name = this.form.value.name
    this.auteur.maisonedition = this.form.value.maisonedition
    this.update();
  }
  update(){
    this.auteurService.createAuteur(this.auteur).subscribe( ()=>{
      this.goToAuteurList()
    });
  }
}
