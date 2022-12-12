import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import { auto } from 'src/app/models/models';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss'],
})
export class AjustesComponent implements OnInit {
  data: auto={
    auto1:{
      modelo: '',
      patente: '',
      marca: '',
      id:"",
      uid:""
      
       }
  }
  resultados: auto[]=[]; 

  constructor(private database:BasededatosService,
    private AuthService: AuthService) { }

  ngOnInit() {
    console.log();
    this.getAutos();
    
  }
   
   async crearNuevo(){
    const id = this.database.getId();
    const uid = await this.AuthService.getuid();
    this.data.auto1.uid = uid;
    this.data.auto1.id= id;
    const path='autos'
    this.database.createDoc(this.data,path,id)
   }

   getAutos(){
    this.database.getCollection<auto>('autos').subscribe(res => {
      console.log('esta es la respuesta',res);
      this.resultados = res;
      
    })
   } 
}
 