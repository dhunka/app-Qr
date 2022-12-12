import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credenciales = {
   correo: null,
   password: null,
  }

  constructor(
    private auth:AuthService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private interaction:InteractionService
  ) { }
 
 

  ngOnInit() {
    
  }
  
  
  
  async login(){
    await this.interaction.presentLoading('ingresando...')
    console.log('creden->',this.credenciales);
    const res= await this.auth.login(this.credenciales.correo,this.credenciales.password).catch(error=>{
      console.log('error');
      this.interaction.closeLoading();
      this.interaction.presentToast('usuario o contraseña invalido')
      
    } )
    if(res){
      console.log('res',res);
      this.interaction.closeLoading();
      this.interaction.presentToast('ingresado con exito')
      this.router.navigate(['/home'])
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
