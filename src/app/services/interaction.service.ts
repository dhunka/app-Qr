import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  loading:any;

  constructor(public toastController:ToastController,
              public loadingController: LoadingController) { }

  async presentToast (mensaje: String) {
      const toast = await this.toastController.create({
        message: 'Cambios guardados',
        duration: 2000,
      });
      toast.present();
    }

  async presentLoading(mensaje: string){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: mensaje,
    });
    await this.loading.present();

    console.log('Loading Dismissed');
    }
  
    async closeLoading(){

      await this.loading.dismiss();
    };

   }




