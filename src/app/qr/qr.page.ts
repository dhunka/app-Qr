import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx'; 
import * as QRCode from 'qrcode';
import { alumno,Curso  } from '../models/models';
import { AuthService } from '../services/auth.service';
import { BasededatosService } from '../services/basededatos.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  providers: [Camera]
})
export class QrPage implements OnInit {
  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';
  imagen: string;
  qrCode: string;
  video: HTMLVideoElement;
  currentUser = {
    nombre: '',
    correo: '',
    uid: '',
    password: '',
    cursos: [],
    asistencia: {},
  };
  uid: string = null;
  info: alumno = null;
  
  
  constructor(private camera: Camera,
    private database:BasededatosService,
    private AuthService: AuthService,
    private AngularFireAuth: AngularFireAuth
    ) {
      
      this.getuid();
      this.video = document.createElement('video');
      
      this.AngularFireAuth.authState.subscribe(user => {
        if (user) {
          // Actualizar la información del alumno en la variable currentUser
      
          this.currentUser.uid = user.uid;
          
        } else {
          // El usuario no está logeado
        }
      });
     }


  ngOnInit() {
  
  }
  
  openCamera() {  
    const option: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.MediaType.PICTURE,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(option).then((imagenData) =>{
      this.imagen = 'data:imagen/jpeg;base64,' + imagenData;
      // Procesar la imagen para extraer el código QR
      QRCode.toDataURL(this.imagen).then((qrCode: string) => {
        this.qrCode = qrCode;
        // Realizar una acción con el código QR extraído
        // Por ejemplo, buscar en una base de datos
        
      });
    }, err => {
      console.log(err);
    })
  }

  handleQrCodeSuccess(result: string) {
    // Asignar el código QR escaneado a la variable
    this.qrCode = result;
    
    // Extraer los valores de courseId y classId del código QR
    const [courseId, classId] = this.qrCode.split(':');
  
    // Ejecutar la función para buscar en la base de datos
    this.searchDatabase(this.qrCode, courseId, classId);
  }

  handleQrCodeError(error: Error) {
    // Mostrar un mensaje de error
    alert(error.message);
  }

  searchDatabase(qrCode: string, courseId: string, classId: string) {
    // Realizar una consulta a la base de datos utilizando el identificador del curso
    this.database.getCollection<Curso>('cursos')
    .pipe(
    map(courses => courses.find(course => course.id === courseId))
    )
    .subscribe((course: Curso) => {
    // Si se encuentra el curso en la base de datos
    if (course) {
    // Verificar si el alumno está inscrito en el curso
    if (this.currentUser.cursos.includes(course.id)) {
    // Verificar si la clase existe en el curso
    if (course.classes.includes(classId)) {
    // Marcar la asistencia del alumno en la clase correspondiente
    this.database.collection('alumnos').doc(this.currentUser.uid).update({
    attendance: {
    [courseId]: {
    [classId]: {
    date: Date.now()
    }
    }
    }
    });
    // Mostrar un mensaje de éxito
    alert('Asistencia marcada con éxito');
    } else {
    // Mostrar un mensaje de error si la clase no existe en el curso
    alert('La clase no existe en el curso');
    }
    } else {
    // Mostrar un mensaje de error si el alumno no está inscrito en el curso
    alert('No estás inscrito en este curso');
    }
    } else {
    // Mostrar un mensaje de error si el curso no se encuentra en la base de datos
    alert('No se encuentra el curso en la base de datos');
    }
    });
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
      this.database.getDoc<alumno>(path, id).subscribe(res => {
        if (res){
          this.info = res;
        }
        console.log('datos son ->', res)
      })
    }
}



