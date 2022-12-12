import { Component, OnInit } from '@angular/core';
import { estacionamiento } from 'src/app/models/models';
import { BasededatosService } from 'src/app/services/basededatos.service';
import { AuthService } from 'src/app/services/auth.service'
@Component({
  selector: 'app-estacionamiento',
  templateUrl: './estacionamiento.page.html',
  styleUrls: ['./estacionamiento.page.scss'],
})
export class EstacionamientoPage implements OnInit {
  data: estacionamiento={
    estacionamiento1:{
      capacidad: '',
      ubicacion: '',
      precio: '',
      id:"",
      uid: ""
       }
  }
  resultados: estacionamiento[]=[]; 

  constructor(private database:BasededatosService,
    private AuthService: AuthService) { }

  ngOnInit() {
    console.log();
    this.getEstacionamientos();
  }

  async crearNuevo(){
    const id = this.database.getId();
    const uid = await this.AuthService.getuid();
    this.data.estacionamiento1.id = id;
    this.data.estacionamiento1.uid = uid;
    const path='estacionamiento'
    this.database.createDoc(this.data,path,id)
   }
   getEstacionamientos(){
    this.database.getCollection<estacionamiento>('estacionamiento').subscribe(res => {
      console.log('esta es la respuesta',res);
      this.resultados = res;
      
    })
   } 
}

