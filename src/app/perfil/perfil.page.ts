import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import { BasededatosService } from 'src/app/services/basededatos.service'
import { alumno,  } from 'src/app/models/models'
import { AlertController } from '@ionic/angular'
import { InteractionService } from 'src/app/services/interaction.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  uid: string = null;
  info: alumno = null;

  constructor(private AuthService: AuthService,
              private BasededatosService: BasededatosService,
              public AlertController: AlertController,
              private InteractionService: InteractionService ) { }

  async ngOnInit() {
    console.log('estoy en perfil');
    this.AuthService.stateuser().subscribe( res=> {
      console.log('en perfil - estado autenticacion ->', res);
    });
    this.getuid();
  }

  async getuid() {
    const uid = await this.AuthService.getuid();
    if (uid) {
      this.uid = uid;
      console.log('uid ->', this.uid);
      this.getInfoUser();
    } else{
      console.log('no existe uid')
    }
  }

  getInfoUser(){
    const path = 'Usuarios';
    const id = this.uid;
    this.BasededatosService.getDoc<alumno>(path, id).subscribe(res => {
      if (res){
        this.info = res;
      }
      console.log('datos son ->', res)
    })
  }

  async editAtributo(name: string) {
    const alert = await this.AlertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar' + name,
      inputs: [
        {
          name,
          type: 'text',
          placeholder: 'Ingresa tu' + name
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secundary',
          handler: () => {
            console.log('Confirm cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (ev) => {
            console.log('Confirm Ok ->', ev);
            this.saveAtributo(name, ev[name])
          }
        }
      ]
    });

    await alert.present();
  }



  async saveAtributo(name: string, input: any) {
    await this.InteractionService.presentLoading('actualizando')
    const path = 'Usuarios';
    const id = this.uid; 
    const updateDoc = {
    };
    updateDoc[name] = input;
    this.BasededatosService.updateDoc(path, id, updateDoc).then( () => {
    this.InteractionService.presentToast('actualizado con exito')
    this.InteractionService.closeLoading();
        
    });
  }

}
