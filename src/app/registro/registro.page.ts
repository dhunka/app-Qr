import { Component, OnInit } from '@angular/core';
import { alumno, } from '../models/models';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { BasededatosService } from '../services/basededatos.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  credentials:FormGroup;

  

  datos: alumno = {
    nombre: '',
    correo: '',
    edad: null,
    uid: '',
    perfil: 'profesor',
    password: '',
    cursos: [],
    asistencia: {},
  }

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private database:BasededatosService,
    private interaction:InteractionService
  ) { }


  get email(){
   return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
   }

  ngOnInit() {
    this.credentials = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4)]]
    })
  }

  async register(){
    this.interaction.presentLoading('resgistrando...')
    console.log('datos -> ', this.datos);          
    const res = await this.authService.registrarUser(this.datos).catch(error=>{
      this.interaction.closeLoading();
      this.interaction.presentToast('error')
      console.log('error');
    })
    if (res){
      console.log('exito al crear un usuario');
      const path='alumnos';
      const id =res.user.uid;
      this.datos.password = null
      await this.database.createDoc(this.datos,path,id)
      await this.interaction.closeLoading();
      await this.interaction.presentLoading('registrado con exito')
      this.router.navigate(['/home'])
    } else{
      this.showAlert('registracion fallida','por favor intente otra vez');
    }
  }
  async showAlert(header,message){
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['ok'],
    });
    await alert.present();
  }

}
